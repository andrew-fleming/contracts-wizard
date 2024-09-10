import { getSelfArg } from './common-options';
import type { BaseImplementedTrait, ContractBuilder } from './contract';
import { Access, requireAccessControl, requireAccessControlAccount } from './set-access-control';
import { defineComponents } from './utils/define-components';
import { defineFunctions } from './utils/define-functions';
import type { Account } from './account';

export const upgradeableOptions = [false, true] as const;

export type Upgradeable = typeof upgradeableOptions[number];

export function setUpgradeable(c: ContractBuilder, upgradeable: Upgradeable, access: Access) {
  if (upgradeable === false) {
    return;
  }

  c.upgradeable = true;

  c.addComponent(components.UpgradeableComponent, [], false);

  c.addStandaloneImport('openzeppelin::upgrades::interface::IUpgradeable');
  c.addStandaloneImport('starknet::ClassHash');

  const t: BaseImplementedTrait = {
    name: 'UpgradeableImpl',
    of: 'IUpgradeable<ContractState>',
    tags: [
      'abi(embed_v0)'
    ],
  };
  c.addImplementedTrait(t);
  requireAccessControl(c, t, functions.upgrade, access, 'UPGRADER', 'upgrader');
}

export function setAccountUpgradeable(c: ContractBuilder, upgradeable: Upgradeable, type: Account) {
  if (upgradeable === false) {
    return;
  }

  c.upgradeable = true;

  c.addComponent(components.UpgradeableComponent, [], false);

  c.addStandaloneImport('openzeppelin::upgrades::interface::IUpgradeable');
  c.addStandaloneImport('starknet::ClassHash');

  const t: BaseImplementedTrait = {
    name: 'UpgradeableImpl',
    of: 'IUpgradeable<ContractState>',
    tags: [
      'abi(embed_v0)'
    ],
  };
  c.addImplementedTrait(t);

  if (type === 'stark')
    // Change to setAccess...?
    requireAccessControlAccount(c, t, functions.upgrade, 'account');
  else {
    requireAccessControlAccount(c, t, functions.upgrade, 'ethAccount');
  }
}

const components = defineComponents( {
  UpgradeableComponent: {
    path: 'openzeppelin::upgrades',
    substorage: {
      name: 'upgradeable',
      type: 'UpgradeableComponent::Storage',
    },
    event: {
      name: 'UpgradeableEvent',
      type: 'UpgradeableComponent::Event',
    },
    impls: [],
    internalImpl: {
      name: 'UpgradeableInternalImpl',
      value: 'UpgradeableComponent::InternalImpl<ContractState>',
    },
  },
});

const functions = defineFunctions({
  upgrade: {
    args: [
      getSelfArg(),
      { name: 'new_class_hash', type: 'ClassHash' },
    ],
    code: [
      'self.upgradeable.upgrade(new_class_hash)'
    ]
  },
});
