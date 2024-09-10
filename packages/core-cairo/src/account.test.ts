import test from 'ava';

import { buildAccount, AccountOptions, Account } from './account';
import { printContract } from './print';

import { account, OptionsError } from '.';

function testAccount(title: string, opts: Partial<AccountOptions>) {
  test(title, t => {
    const c = buildAccount({
      name: 'MyAccount',
      type: 'stark',
      ...opts,
    });
    t.snapshot(printContract(c));
  });
}

function testEthAccount(title: string, opts: Partial<AccountOptions>) {
  test(title, t => {
    const c = buildAccount({
      name: 'MyAccount',
      type: 'eth',
      ...opts,
    });
    t.snapshot(printContract(c));
  });
}

/**
 * Tests external API for equivalence with internal API
 */
function testAPIEquivalence(title: string, opts?: AccountOptions) {
  test(title, t => {
    t.is(account.print(opts), printContract(buildAccount({
      name: 'MyAccount',
      type: 'stark',
      ...opts,
    })));
  });
}

function testEthAPIEquivalence(title: string, opts?: AccountOptions) {
    test(title, t => {
      t.is(account.print(opts), printContract(buildAccount({
        name: 'MyAccount',
        type: 'eth',
        ...opts,
      })));
    });
  }

testAccount('basic account, non-upgradeable', {
  upgradeable: false,
});

testAccount('basic account', {});

testAccount('account declarable', {
  declare: true,
});

testAccount('account deployable', {
  deploy: true,
});

testAccount('account public key', {
  pubkey: true,
});

testAccount('account declarable deployable', {
  declare: true,
  deploy: true
});

testAccount('account declarable public key', {
  declare: true,
  pubkey: true
});

testAccount('account deployable public key', {
  deploy: true,
  pubkey: true
});

testAccount('account full, non-upgradeable', {
  name: 'MyAccount',
  type: 'stark',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'account',
  upgradeable: false
});

testAccount('account full, upgradeable', {
  name: 'MyAccount',
  type: 'stark',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'account',
  upgradeable: true
});

testEthAccount('basic ethAccount, non-upgradeable', {
  upgradeable: false,
});

testEthAccount('basic ethAccount', {});

testEthAccount('ethAccount declarable', {
  declare: true,
});

testEthAccount('ethAccount deployable', {
  deploy: true,
});

testEthAccount('ethAccount public key', {
  pubkey: true,
});

testEthAccount('ethAccount declarable deployable', {
  declare: true,
  deploy: true
});

testEthAccount('ethAccount declarable public key', {
  declare: true,
  pubkey: true
});

testEthAccount('ethAccount deployable public key', {
  deploy: true,
  pubkey: true
});

testEthAccount('ethAccount full, non-upgradeable', {
  name: 'MyAccount',
  type: 'eth',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'account',
  upgradeable: false
});

testEthAccount('ethAccount full, upgradeable', {
  name: 'MyAccount',
  type: 'eth',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'account',
  upgradeable: true
});

//testAPIEquivalence('account API default');

testAPIEquivalence('account API full upgradeable', {
  name: 'CustomAccount',
  type: 'stark',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'account',
  upgradeable: true,
});

test('account API assert defaults', async t => {
  t.is(account.print(account.defaults), account.print());
});

testEthAPIEquivalence('eth account API full upgradeable', {
  name: 'CustomAccount',
  type: 'eth',
  declare: true,
  deploy: true,
  pubkey: true,
  access: 'ethAccount',
  upgradeable: true,
});
