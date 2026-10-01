# Neutron Auction and Undelegations Contract, Chain Upgrade (Phase 1) security audit

Neutron's auction CosmWasm contract in Rust runs a time-bounded deposit auction, then settles in batches, allocating a fixed USDC budget pro rata to deposits and burning the claim tokens before users claim their USDC.

Codezen audited Neutron Auction and Undelegations Contract, Chain Upgrade (Phase 1) together with Oak Security. Technologies in scope: Rust, CosmWasm and Neutron. We reported 15 findings: 6 minor and 9 informational.

- Audit type: CosmWasm smart contract audit
- Technologies: Rust, CosmWasm, Neutron
- Ecosystem: Cosmos
- Delivered with: Oak Security
- Report date: 9 April 2026
- Full report (PDF): https://github.com/oak-security/audit-reports/blob/main/Neutron/2026-04-09%20Audit%20Report%20%E2%80%93%20Neutron%20Auction%20and%20Undelegations%20Contract%2C%20Chain%20Upgrade%20(Phase%201).pdf
- Project website: https://neutron.org/
- Page: https://www.codezen.tech/audits/neutron-auction-and-undelegations-phase-1/

## Findings by severity

| Severity | Count |
| --- | --- |
| Critical | 0 |
| Major | 0 |
| Minor | 6 |
| Info | 9 |
| Total | 15 |

Need a similar audit? Email info@codezen.tech or visit https://www.codezen.tech/.
