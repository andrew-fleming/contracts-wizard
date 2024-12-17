# Snapshot report for `src/stablecoin.test.ts`

The actual snapshot is saved in `stablecoin.test.ts.snap`.

Generated by [AVA](https://avajs.dev).

## basic stablecoin

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    }␊
    `

## stablecoin burnable

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Burnable, ERC20Permit {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    }␊
    `

## stablecoin pausable

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Pausable, Ownable, ERC20Permit {␊
        constructor(address initialOwner)␊
            ERC20("MyStablecoin", "MST")␊
            Ownable(initialOwner)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function pause() public onlyOwner {␊
            _pause();␊
        }␊
    ␊
        function unpause() public onlyOwner {␊
            _unpause();␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Pausable)␊
        {␊
            super._update(from, to, value);␊
        }␊
    }␊
    `

## stablecoin pausable with roles

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Pausable, AccessControl, ERC20Permit {␊
        bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");␊
    ␊
        constructor(address defaultAdmin, address pauser)␊
            ERC20("MyStablecoin", "MST")␊
            ERC20Permit("MyStablecoin")␊
        {␊
            _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);␊
            _grantRole(PAUSER_ROLE, pauser);␊
        }␊
    ␊
        function pause() public onlyRole(PAUSER_ROLE) {␊
            _pause();␊
        }␊
    ␊
        function unpause() public onlyRole(PAUSER_ROLE) {␊
            _unpause();␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Pausable)␊
        {␊
            super._update(from, to, value);␊
        }␊
    }␊
    `

## stablecoin pausable with managed

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {AccessManaged} from "@openzeppelin/contracts/access/manager/AccessManaged.sol";␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Pausable, AccessManaged, ERC20Permit {␊
        constructor(address initialAuthority)␊
            ERC20("MyStablecoin", "MST")␊
            AccessManaged(initialAuthority)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function pause() public restricted {␊
            _pause();␊
        }␊
    ␊
        function unpause() public restricted {␊
            _unpause();␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Pausable)␊
        {␊
            super._update(from, to, value);␊
        }␊
    }␊
    `

## stablecoin burnable pausable

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";␊
    import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {␊
        constructor(address initialOwner)␊
            ERC20("MyStablecoin", "MST")␊
            Ownable(initialOwner)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function pause() public onlyOwner {␊
            _pause();␊
        }␊
    ␊
        function unpause() public onlyOwner {␊
            _unpause();␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Pausable)␊
        {␊
            super._update(from, to, value);␊
        }␊
    }␊
    `

## stablecoin preminted

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {␊
            _mint(msg.sender, 1000 * 10 ** decimals());␊
        }␊
    }␊
    `

## stablecoin premint of 0

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    }␊
    `

## stablecoin mintable

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";␊
    ␊
    contract MyStablecoin is ERC20, Ownable, ERC20Permit {␊
        constructor(address initialOwner)␊
            ERC20("MyStablecoin", "MST")␊
            Ownable(initialOwner)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function mint(address to, uint256 amount) public onlyOwner {␊
            _mint(to, amount);␊
        }␊
    }␊
    `

## stablecoin mintable with roles

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, AccessControl, ERC20Permit {␊
        bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");␊
    ␊
        constructor(address defaultAdmin, address minter)␊
            ERC20("MyStablecoin", "MST")␊
            ERC20Permit("MyStablecoin")␊
        {␊
            _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);␊
            _grantRole(MINTER_ROLE, minter);␊
        }␊
    ␊
        function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {␊
            _mint(to, amount);␊
        }␊
    }␊
    `

## stablecoin permit

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    }␊
    `

## stablecoin custodian

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Custodian} from "@openzeppelin/community-contracts/contracts/token/ERC20/extensions/ERC20Custodian.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Custodian, Ownable, ERC20Permit {␊
        constructor(address initialOwner)␊
            ERC20("MyStablecoin", "MST")␊
            Ownable(initialOwner)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function _isCustodian(address user) internal view override returns (bool) {␊
            return user == owner();␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Custodian)␊
        {␊
            super._update(from, to, value);␊
        }␊
    }␊
    `

## stablecoin allowlist

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Allowlist} from "@openzeppelin/community-contracts/contracts/token/ERC20/extensions/ERC20Allowlist.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Allowlist, Ownable, ERC20Permit {␊
        constructor(address initialOwner)␊
            ERC20("MyStablecoin", "MST")␊
            Ownable(initialOwner)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function allowUser(address user) public onlyOwner {␊
            _allowUser(user);␊
        }␊
    ␊
        function disallowUser(address user) public onlyOwner {␊
            _disallowUser(user);␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Allowlist)␊
        {␊
            super._update(from, to, value);␊
        }␊
    ␊
        function _approve(address owner, address spender, uint256 value, bool emitEvent)␊
            internal␊
            override(ERC20, ERC20Allowlist)␊
        {␊
            super._approve(owner, spender, value, emitEvent);␊
        }␊
    }␊
    `

## stablecoin blocklist

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Blocklist} from "@openzeppelin/community-contracts/contracts/token/ERC20/extensions/ERC20Blocklist.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Blocklist, Ownable, ERC20Permit {␊
        constructor(address initialOwner)␊
            ERC20("MyStablecoin", "MST")␊
            Ownable(initialOwner)␊
            ERC20Permit("MyStablecoin")␊
        {}␊
    ␊
        function blockUser(address user) public onlyOwner {␊
            _blockUser(user);␊
        }␊
    ␊
        function unblockUser(address user) public onlyOwner {␊
            _unblockUser(user);␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Blocklist)␊
        {␊
            super._update(from, to, value);␊
        }␊
    ␊
        function _approve(address owner, address spender, uint256 value, bool emitEvent)␊
            internal␊
            override(ERC20, ERC20Blocklist)␊
        {␊
            super._approve(owner, spender, value, emitEvent);␊
        }␊
    }␊
    `

## stablecoin votes

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";␊
    import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit, ERC20Votes {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Votes)␊
        {␊
            super._update(from, to, value);␊
        }␊
    ␊
        function nonces(address owner)␊
            public␊
            view␊
            override(ERC20Permit, Nonces)␊
            returns (uint256)␊
        {␊
            return super.nonces(owner);␊
        }␊
    }␊
    `

## stablecoin votes + blocknumber

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";␊
    import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit, ERC20Votes {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Votes)␊
        {␊
            super._update(from, to, value);␊
        }␊
    ␊
        function nonces(address owner)␊
            public␊
            view␊
            override(ERC20Permit, Nonces)␊
            returns (uint256)␊
        {␊
            return super.nonces(owner);␊
        }␊
    }␊
    `

## stablecoin votes + timestamp

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";␊
    import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit, ERC20Votes {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    ␊
        function clock() public view override returns (uint48) {␊
            return uint48(block.timestamp);␊
        }␊
    ␊
        // solhint-disable-next-line func-name-mixedcase␊
        function CLOCK_MODE() public pure override returns (string memory) {␊
            return "mode=timestamp";␊
        }␊
    ␊
        // The following functions are overrides required by Solidity.␊
    ␊
        function _update(address from, address to, uint256 value)␊
            internal␊
            override(ERC20, ERC20Votes)␊
        {␊
            super._update(from, to, value);␊
        }␊
    ␊
        function nonces(address owner)␊
            public␊
            view␊
            override(ERC20Permit, Nonces)␊
            returns (uint256)␊
        {␊
            return super.nonces(owner);␊
        }␊
    }␊
    `

## stablecoin flashmint

> Snapshot 1

    `// SPDX-License-Identifier: MIT␊
    // Compatible with OpenZeppelin Contracts ^5.0.0␊
    pragma solidity ^0.8.22;␊
    ␊
    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";␊
    import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";␊
    import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";␊
    ␊
    contract MyStablecoin is ERC20, ERC20Permit, ERC20FlashMint {␊
        constructor() ERC20("MyStablecoin", "MST") ERC20Permit("MyStablecoin") {}␊
    }␊
    `