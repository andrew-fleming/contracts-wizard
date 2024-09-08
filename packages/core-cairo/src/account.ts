import { Contract, ContractBuilder } from './contract';
import { CommonOptions, withCommonDefaults } from './common-options';
import { defaults as commonDefaults } from './common-options';
import { setAccountUpgradeable } from './set-upgradeable';
import { setInfo } from './set-info';
import { defineComponents } from './utils/define-components';
import { printContract } from './print';
import { addSRC5Component } from './common-components';


export const accountOptions = ['stark', 'eth'] as const;

export type Account = typeof accountOptions[number];

export const defaults: Required<AccountOptions> = {
  name: 'MyAccount',
  type: 'stark',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'account',
  upgradeable: commonDefaults.upgradeable,
  info: commonDefaults.info
} as const;

export function printAccount(opts: AccountOptions = defaults): string {
  return printContract(buildAccount(opts));
}

export interface AccountOptions extends CommonOptions {
  name: string;
  type: Account;
  declare?: boolean,
  deploy?: boolean,
  pubkey?: boolean
}

function withDefaults(opts: AccountOptions): Required<AccountOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    name: opts.name ?? defaults.name,
    type: opts.type ?? defaults.type,
    declare: opts.declare ?? defaults.declare,
    deploy: opts.deploy ?? defaults.deploy,
    pubkey: opts.pubkey ?? defaults.pubkey
  }
}

export function isAccessControlRequired(opts: Partial<AccountOptions>): boolean {
  return opts.upgradeable === false;
}

export function buildAccount(opts: AccountOptions): Contract {
  const c = new ContractBuilder(opts.name);

  const allOpts = withDefaults(opts);

  if (opts.type === 'stark') {
    c.addConstructorArgument({ name:'public_key', type:'felt252' });
    c.addComponent(components.AccountComponent, [{ lit:'public_key' }], true);
  } else if (opts.type === 'eth') {
    c.addStandaloneImport('openzeppelin::account::interface::EthPublicKey;');
    c.addConstructorArgument({ name:'public_key', type:'EthPublicKey' });
    c.addComponent(components.EthAccountComponent, [{ lit:'public_key' }], true);
  }

  if (opts.declare && opts.deploy && opts.pubkey) {
    addAccountMixin(c, opts.type);
  } else {
    addSRC6(c, opts.type)

    if (opts.declare) {
      addDeclarer(c, opts.type)
    }

    if (opts.deploy) {
        addDeployer(c, opts.type)
    }

    if (opts.pubkey) {
        addPublicKey(c, opts.type)
    }
  }

  setAccountUpgradeable(c, allOpts.upgradeable, allOpts.type);
  setInfo(c, allOpts.info);

  return c;
}

function addSRC6(c: ContractBuilder, accountType: Account) {
  let baseComponent = accountType === 'stark' ? 'AccountComponent' : 'EthAccountComponent';
  let componentType = accountType === 'stark' ? components.AccountComponent : components.EthAccountComponent;

  c.addImplToComponent(componentType, {
      name: 'SRC6Impl',
      value: `${baseComponent}::SRC6Impl<ContractState>`,
    });

    c.addInterfaceFlag('ISRC5');
    addSRC5Component(c);
}

function addDeclarer(c: ContractBuilder, accountType: Account) {
  let baseComponent = accountType === 'stark' ? 'AccountComponent' : 'EthAccountComponent';
  let componentType = accountType === 'stark' ? components.AccountComponent : components.EthAccountComponent;

  c.addImplToComponent(componentType, {
      name: 'DeclarerImpl',
      value: `${baseComponent}::DeclarerImpl<ContractState>`,
    });
}

function addDeployer(c: ContractBuilder, accountType: Account) {
  let baseComponent = accountType === 'stark' ? 'AccountComponent' : 'EthAccountComponent';
  let componentType = accountType === 'stark' ? components.AccountComponent : components.EthAccountComponent;

  c.addImplToComponent(componentType, {
      name: 'DeployerImpl',
      value: `${baseComponent}::DeployerImpl<ContractState>`,
    });
}

function addPublicKey(c: ContractBuilder, accountType: Account) {
  let baseComponent = accountType === 'stark' ? 'AccountComponent' : 'EthAccountComponent';
  let componentType = accountType === 'stark' ? components.AccountComponent : components.EthAccountComponent;

  c.addImplToComponent(componentType, {
      name: 'PublicKeyImpl',
      value: `${baseComponent}::PublicKeyImpl<ContractState>`,
    });
}

function addAccountMixin(c: ContractBuilder, accountType: Account) {
  let accountPrefix = accountType === 'stark' ? 'Account' : 'EthAccount';
  let componentType = accountType === 'stark' ? components.AccountComponent : components.EthAccountComponent;

  c.addImplToComponent(componentType, {
      name: `${accountPrefix}MixinImpl`,
      value: `${accountPrefix}Component::${accountPrefix}MixinImpl<ContractState>`,
    });
    c.addInterfaceFlag('ISRC5');
    addSRC5Component(c);
}

const components = defineComponents( {
  AccountComponent: {
    path: 'openzeppelin::account',
    substorage: {
      name: 'account',
      type: 'AccountComponent::Storage',
    },
    event: {
      name: 'AccountEvent',
      type: 'AccountComponent::Event',
    },
    impls: [],
    internalImpl: {
      name: 'AccountInternalImpl',
      value: 'AccountComponent::InternalImpl<ContractState>',
    },
  },
  EthAccountComponent: {
    path: 'openzeppelin::account::eth_account',
    substorage: {
      name: 'eth_account',
      type: 'EthAccountComponent::Storage',
    },
    event: {
      name: 'EthAccountEvent',
      type: 'EthAccountComponent::Event',
    },
    impls: [],
    internalImpl: {
      name: 'EthAccountInternalImpl',
      value: 'EthAccountComponent::InternalImpl<ContractState>',
    },
  },
});
