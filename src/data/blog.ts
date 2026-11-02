/**
 * Blog / Insights Data
 * Articles for the Latest Insights section.
 * Replace with real CMS or API integration when content is ready.
 */

import type { BlogPost } from '@/types';
import { images } from '@/assets/images';

export const blogData: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'cooperative-annual-audit-preparation-guide',
    title: "The Complete Guide to Cooperative Annual Audit Preparation in Nepal",
    excerpt:
      "Most audit findings in cooperatives are preventable. Learn the systematic preparation steps that consistently result in clean audit opinions — from reconciliation schedules to documentation standards under Nepal's cooperative regulations.",
    category: 'audit',
    categoryLabel: 'Audit',
    author: 'Sitakarn Advisory Team',
    publishedAt: '2024-11-15',
    readingTime: 8,
    imageUrl: images.blog.post1,
    featured: true,
    tags: ['audit', 'cooperative', 'compliance', 'annual-audit'],
    body: `
For Savings and Credit Cooperatives (SACCOs) and multi-purpose cooperatives in Nepal, the annual statutory audit is not merely a legal formality—it is a critical test of member trust, regulatory standing, and financial health. Under Nepal's Cooperative Act 2074 and Department of Cooperatives (DoC) directives, cooperatives face rigorous oversight regarding liquidity ratios, loan loss provisions, and governance standards.

Over two decades of advising financial institutions, the Sitakarn team has observed that more than 80% of adverse audit findings and qualified opinions stem from administrative disorganization rather than structural insolvency. By instituting a structured pre-audit schedule 30 to 60 days before the fiscal close, cooperatives can ensure a frictionless audit process and achieve an unreserved clean audit opinion.

## 1. Core Documentation and Ledger Reconciliation

The cornerstone of an efficient audit is exhaustive reconciliation between primary sub-ledgers and the general ledger. Auditors will immediately scrutinize discrepancies between member accounts and balance sheet totals.

* **Bank Account Reconciliations:** Prepare monthly bank reconciliation statements for every operating, reserve, and fixed-deposit account held with commercial banks and development banks. Ensure all outstanding cheques, direct debits, and transit items are verified with formal bank balance confirmation certificates.
* **Member Share Capital Ledger:** Reconcile individual member share registers against the aggregate share capital account. Document all new share subscriptions, member exits, and share transfers approved by the Board during the fiscal year.
* **Loan Portfolio Aging and Provisioning:** Classify every outstanding loan into statutory aging categories (Pass, Watchlist, Substandard, Doubtful, and Bad). Calculate loan loss provisioning strictly in compliance with DoC guidelines and ensure reserve accounts accurately reflect these figures.
* **Deposit Ledger Balance:** Confirm that member savings and term deposit ledgers reconcile to the general ledger to the exact rupee, with accrued interest schedules fully calculated and accounted for.

## 2. Statutory Compliance and Regulatory Directives

Inland Revenue Department (IRD) and Department of Cooperatives requirements must be verified before the independent auditor steps into your premises:

* **Tax Deduction at Source (TDS):** Verify that TDS has been deducted and remitted on interest payments to depositors, staff salaries, consultant fees, and rental payments. Ensure TDS vouchers and IRD e-filing slips match the general ledger entries.
* **Statutory Reserve Allocations:** Calculate mandatory contributions to the General Reserve Fund (minimum 25% of net surplus), Cooperative Education Fund, Cooperative Development Fund, and Community Development Fund in accordance with Section 44 of the Cooperative Act 2074.
* **Supervisory Committee Reports:** Have all quarterly reports submitted by the internal Supervisory Committee (Lekha Suparibekshan Samiti) signed and bound, along with formal minutes detailing board responses and corrective actions.

## 3. Common Audit Findings and How to Prevent Them

Preparation should focus on high-risk compliance areas that frequently trigger auditor qualifications:

* **Incomplete Collateral and KYC Records:** Ensure that all mortgaged properties possess certified Lal Purja copies, recent tax clearance receipts, official Rokka registration letters from the Land Revenue Office (Malpot), and valid engineering valuation reports.
* **Breaches of Single-Borrower Limits:** Confirm that no single borrower or related-party group exceeds the statutory percentage limit of total primary capital.
* **Cash-in-Hand Thresholds:** Maintain strict documentary evidence that vault and counter cash balances did not exceed board-approved insurance limits, particularly around month-end closes.

## Conclusion: Implementing a Dry-Run Internal Review

A clean audit is won in the weeks preceding the auditor's arrival. We strongly recommend conducting a simulated internal dry run 30 days prior to the statutory audit. Designate a dedicated liaison officer to manage auditor document requests, maintain a centralized audit binder (both digital and physical), and ensure board members and the management team are aligned.
    `.trim(),
  },
  {
    id: 'blog-2',
    slug: 'cooperative-tax-exemptions-nepal-2024',
    title: "Tax Exemptions Available to Nepalese Cooperatives: 2024 Update",
    excerpt:
      "Registered cooperatives in Nepal enjoy several significant tax advantages under the Income Tax Act 2058 that many organizations fail to fully utilize. This article explains the exemptions, the qualifying conditions, and how to properly document claims with the IRD.",
    category: 'tax-update',
    categoryLabel: 'Tax',
    author: 'Sitakarn Tax Team',
    publishedAt: '2024-10-22',
    readingTime: 11,
    imageUrl: images.blog.post2,
    featured: true,
    tags: ['tax', 'exemption', 'cooperative', 'inland-revenue'],
    body: `
Navigating corporate taxation in Nepal requires a comprehensive understanding of the evolving provisions within the Income Tax Act 2058, especially as annual Finance Acts introduce nuanced modifications for financial cooperatives and community enterprises. While cooperatives operate under a mutual benefit ethos, the Inland Revenue Department (IRD) maintains rigorous criteria to distinguish exempt member activities from taxable commercial operations.

Understanding which exemptions apply to your cooperative—and maintaining rigorous supporting documentation—can mean the difference between substantial tax savings and crippling reassessments coupled with statutory penalties.

## 1. Qualifying Cooperatives and Exemption Framework

Under Section 11 of the Income Tax Act 2058, tax treatment varies substantially depending on the cooperative's registered mandate and geographical location:

* **Agricultural and Agro-Based Cooperatives:** Cooperatives engaged in agricultural production, cold storage operations, seed processing, and dairy collection operating primarily for member benefit enjoy 100% income tax exemption on surplus derived directly from these core activities.
* **Savings and Credit Cooperatives (Geographical Tiers):** Taxation of SACCOs is stratified based on municipal jurisdiction:
  * Cooperatives operating exclusively within **Rural Municipalities (Gaupalika)** are exempt from income tax on income generated from financial intermediation.
  * Cooperatives in **Municipalities (Nagarpalika)**, **Sub-Metropolitan Cities (Upa-Mahanagarpalika)**, and **Metropolitan Cities (Mahanagarpalika)** are subject to graduated corporate income tax rates (ranging from 5% to 15%) as stipulated in recent Finance Acts.
* **Non-Member Transactions:** Any revenue derived from dealings with non-members, commercial asset leases, or third-party investments is treated as ordinary business income and taxed at standard corporate rates.

## 2. Mandatory IRD Filing Protocols for Exempt Organizations

A common misconception among cooperative leaders is that tax-exempt status eliminates the requirement to file annual tax returns. Under the law, failure to file results in severe fines regardless of taxable liability.

* **Filing D01 / D03 Returns:** Every registered cooperative must file an annual income tax return through the IRD Integrated Tax System (ITS) portal within three months of the fiscal year end (or within approved extension windows).
* **Withholding Tax (TDS) Compliance:** Cooperatives must act as withholding agents. TDS must be deducted at source on member deposit interest (under statutory caps), staff compensation, vendor contracts, and property rents, and deposited by the 25th of the subsequent Nepali month.
* **Capital Gains Tax (CGT) on Property Disposals:** When a cooperative disposes of real property or acquired collateral, capital gains tax obligations must be cleared prior to ownership transfer at the Land Revenue Office.

## 3. Preparing for IRD Tax Audits and Scrutiny

Tax authorities regularly conduct comprehensive audits of financial cooperatives. To withstand regulatory scrutiny, institutions must maintain meticulous records:

* Segregate member-derived income from external transaction streams in the chart of accounts.
* Maintain clear minutes of the Annual General Meeting (AGM) confirming dividend declarations and statutory reserve transfers.
* Preserve physical and digital audit trails of all tax deduction certificates issued to depositors.

## Summary for Cooperative Boards

Proactive tax planning is an indispensable fiduciary duty. Cooperative boards must review their tax exposure semi-annually with qualified tax consultants to ensure full compliance with the latest IRD directives while legitimately maximizing available statutory relief.
    `.trim(),
  },
  {
    id: 'blog-3',
    slug: 'nfrs-for-smes-cooperatives-nepal',
    title: "NFRS for SMEs & Cooperatives: What Nepalese Organizations Need to Know",
    excerpt:
      "Nepal's updated Nepal Financial Reporting Standards (NFRS) and Nepal Accounting Standards (NAS) bring important changes for cooperatives and SMEs. We break down the key requirements and what they mean for your annual accounts.",
    category: 'accounting',
    categoryLabel: 'Accounting',
    author: 'Sitakarn Advisory Team',
    publishedAt: '2024-09-08',
    readingTime: 9,
    imageUrl: images.blog.post3,
    featured: false,
    tags: ['NFRS', 'NAS', 'accounting-standards', 'financial-reporting'],
    body: `
The accounting landscape in Nepal is undergoing a profound transformation. Under directives from the Institute of Chartered Accountants of Nepal (ICAN), the phased implementation of Nepal Financial Reporting Standards (NFRS) and NFRS for Small and Medium-sized Entities (SMEs) has shifted financial reporting from rule-based compliance to a principle-driven framework focused on economic substance.

For cooperatives, financial institutions, and growth-oriented SMEs, adopting NFRS is not merely a technical compliance challenge—it fundamentally alters how assets, liabilities, revenues, and member equity are presented to stakeholders.

## 1. Key Conceptual Shifts Introduced by NFRS for SMEs

Traditional Nepal Accounting Standards (NAS) relied heavily on historical cost accounting and conservative convention. NFRS introduces several modern accounting paradigms:

* **Fair Value Measurement:** Assets held for investment and certain financial instruments must be reflected at fair market value rather than depreciated historical cost, requiring periodic professional valuation.
* **Component-Based Depreciation:** Property, Plant, and Equipment (PPE) must be broken down into significant components with differing useful lives and depreciated accordingly (e.g., separating land, building structure, and elevator systems).
* **Revenue Recognition (Section 23):** Revenue can only be recognized when risks and rewards of ownership have transferred, eliminating premature recognition on credit transactions.

## 2. Practical Implications for Financial Cooperatives

SACCOs and multi-purpose cooperatives encounter distinct challenges during NFRS transition:

* **Classification of Member Share Capital:** Under international reporting principles (IFRIC 2), member shares that are redeemable at the member's option can technically qualify as financial liabilities rather than equity. Nepalese cooperatives must structure accounting disclosures to balance NFRS requirements with the Cooperative Act's legal classification of shares as permanent capital.
* **Loan Loss Provisioning vs. Impairment Testing:** While the Department of Cooperatives prescribes formulaic aging brackets, NFRS requires financial institutions to evaluate objective evidence of loan impairment and calculate present-value discounted cash flows for impaired assets.
* **Employee Benefit Obligations (NAS 19):** Long-term employee liabilities such as gratuity, leave encashment, and defined benefit pension schemes must be valued using formal actuarial assumptions rather than simple balance-sheet cash reserves.

## 3. Practical Steps for a Smooth Implementation

Transitioning to NFRS requires careful preparation across your entire finance department:

* **Conduct a Comprehensive Gap Analysis:** Review your existing chart of accounts and legacy accounting policies against NFRS for SMEs standards to identify divergence points.
* **Upgrade Core Banking Software (CBS):** Ensure your CBS can generate multi-tier depreciation schedules, amortized cost loan tables, and required financial note disclosures automatically.
* **Retrain Finance Personnel and Educate the Board:** Invest in technical training for internal accountants and provide high-level briefings to board members so they understand why key ratios will shift under the new format.

## Conclusion

While the transition to NFRS requires upfront investment in time and technical expertise, the long-term benefits are undeniable. Transparent, standardized financial statements enhance institutional credibility, streamline regulatory approvals, and position Nepalese organizations for institutional partnerships and sustainable growth.
    `.trim(),
  },
  {
    id: 'blog-4',
    slug: 'strengthening-cooperative-governance-nepal',
    title: "Five Governance Reforms That Strengthen Cooperative Financial Oversight",
    excerpt:
      "Sound governance is the foundation of cooperative financial health under Nepal's Cooperative Act 2074. We examine five structural changes that cooperatives of all sizes can implement to improve board oversight and reduce financial risk.",
    category: 'cooperative-finance',
    categoryLabel: 'Cooperative Finance',
    author: 'Sitakarn Advisory Team',
    publishedAt: '2024-08-19',
    readingTime: 7,
    imageUrl: images.blog.post4,
    featured: false,
    tags: ['governance', 'cooperative', 'board', 'oversight'],
    body: `
The cooperative movement in Nepal represents one of the largest mobilizers of grassroots domestic capital, with thousands of institutions serving millions of members. However, rapid expansion without commensurate institutional checks has exposed systemic governance vulnerabilities across the sector.

Restoring depositor trust and securing long-term solvency requires deliberate structural reform. Based on our advisory work with leading financial institutions and cooperative federations, we have identified five high-impact governance reforms that boards of directors must enact immediately.

## 1. Empowering the Supervisory Committee (Lekha Suparibekshan Samiti)

In many institutions, the Supervisory Committee has historically operated as a rubber stamp, lacking either the technical capacity or the independence to challenge executive management decisions.

* **Independent Reporting Line:** The Supervisory Committee must report directly to the General Assembly (Sadharan Sabha), not the Board of Directors.
* **Unrestricted Document Access:** By-laws must guarantee the committee unrestricted, unannounced access to core banking databases, cash vaults, and loan approval files.
* **Mandatory Quarterly Reviews:** The committee must conduct quarterly reviews focusing on large-value withdrawals, overdue loan recoveries, and regulatory compliance breaches.

## 2. Eradicating Insider Lending and Enforcing Strict Single-Borrower Caps

Conflict of interest in credit allocation remains the primary cause of cooperative distress in Nepal.

* **Prohibition of Unsecured Insider Loans:** Strictly prohibit loans to board members, committee leaders, and senior management without 100% liquid collateral or conservative, unencumbered real estate mortgages.
* **Transparent Related-Party Disclosures:** Maintain an exhaustive register of related parties and business interests. Any credit facility extended to a relative or affiliated business must be explicitly documented and disclosed in the annual report.
* **Rigid Single-Borrower Limits:** Enforce regulatory lending caps (typically no more than 10–15% of core capital to a single borrower or economic group) without exception.

## 3. Implementing Active Asset-Liability Matching (ALM)

Liquidity mismatches occur when long-term loans (such as 5- to 10-year property or business term loans) are funded by short-term, volatile member deposits.

* **Minimum Liquid Asset Ratios:** Maintain at least 15% to 20% of total member deposits in high-quality liquid assets (cash in vault, commercial bank current accounts, and government securities).
* **Deposit Concentration Caps:** Monitor the top 20 depositors. No single depositor or institution should represent more than 5% of total deposits, preventing sudden liquidity shocks upon withdrawal.

## 4. Formalizing AML/CFT and GoAML Compliance

With Nepal under enhanced scrutiny regarding anti-money laundering and combating the financing of terrorism (AML/CFT), cooperatives must elevate compliance:

* Institute robust Know Your Customer (KYC) documentation for all depositors and borrowers.
* Establish automated triggers for reporting Threshold Transactions (TTR) and Suspicious Transactions (STR) to the Financial Information Unit (FIU) of Nepal Rastra Bank via the GoAML portal.

## 5. Transitioning to Centralized, Tamper-Evident Core Banking Systems

Manual record-keeping and outdated offline software create opportunities for ledger manipulation and unauthorized balance adjustments.

* Transition to secure, cloud-hosted or centralized core banking software that maintains immutable audit trails of every database transaction.
* Implement dual-authorization workflows for all cash disbursements exceeding defined internal thresholds.

## The Path Forward

Governance is not an obstacle to business growth; it is the protective framework that makes sustainable growth possible. Cooperatives that lead the way in transparency, prudent credit discipline, and rigorous oversight will not only endure market cycles—they will earn the enduring confidence of their communities.
    `.trim(),
  },
  {
    id: 'blog-5',
    slug: 'real-estate-due-diligence-nepal',
    title: "Real Estate Due Diligence in Nepal: A Complete Buyer's Guide",
    excerpt:
      "Buying property in Nepal involves complex title verification, AML/CFT compliance, and government registration requirements. This guide walks buyers through Sitakarn's structured due diligence framework — including our Category A/B/C property classification system.",
    category: 'accounting',
    categoryLabel: 'Real Estate',
    author: 'Sitakarn Brokerage Team',
    publishedAt: '2024-07-30',
    readingTime: 10,
    imageUrl: images.blog.post5,
    featured: false,
    tags: ['real-estate', 'due-diligence', 'property', 'Nepal'],
    body: `
Acquiring real estate in Nepal—whether residential land, commercial buildings, or institutional development plots—represents one of the most substantial capital commitments an individual or corporate entity will make. Yet, the property market in Nepal has historically operated with informal intermediaries, fragmented records, and opaque title histories.

Without rigorous, multi-layered due diligence, property buyers risk encountering disputed ownership, undisclosed bank mortgages, inheritance litigation, right-of-way encumbrances, and municipal zoning restrictions.

At Sitakarn Mortgage Pvt. Ltd., our foundational operating philosophy is simple: **"No Clear Title – No Transaction Recommendation."** This guide details our comprehensive due diligence framework designed to protect buyers at every stage of acquisition.

## 1. Land Revenue Office (Malpot) and Survey Office (Napi) Verification

A valid physical Land Ownership Certificate (Lal Purja) presented by a seller is only the starting point. Legally binding verification requires on-site checks across multiple government agencies:

* **Mothe (Field Register) Inspection:** We inspect the official Mothe records at the relevant Land Revenue Office (Malpot Karyalaya) to ensure the seller’s name, father’s/husband’s name, citizenship number, and plot boundaries match the government's master ledger without alteration.
* **Official Rokka (Freeze/Encumbrance) Check:** We run formal searches to verify whether the property has been frozen (Rokka) due to commercial bank loans, court injunctions, government revenue investigations, or pending civil litigation.
* **Cadastral Map (Napi Naksha) Matching:** At the Survey Office (Napi Karyalaya), we overlay the physical ground measurements against official cadastral blueprint sheets to detect plot size discrepancies, road encroachments, or neighbor boundary overlaps.
* **Tiro (Property Tax) Clearance:** We verify that local municipal property taxes (Sampatti Kar) and ward taxes have been paid up to date, obtaining certified tax clearance receipts.

## 2. Sitakarn's Three-Tier Property Classification System

To give buyers absolute clarity before committing earnest money, Sitakarn categorizes every property in our SPIN (Sitakarn Property Identification Number) database into three distinct tiers:

* **Category A (Fully Verified & Transaction-Ready):**
  * Clean, undisputed ownership history spanning at least 15 to 20 years.
  * Zero bank encumbrances or formal release deeds in hand.
  * Certified municipal road access (standard minimum width verified).
  * 100% verified seller KYC and verified source of title (purchase, inheritance, or partition deed).
* **Category B (Verification In-Progress):**
  * Minor administrative items pending (e.g., updating municipal road registry, boundary confirmation with adjacent plots, or obtaining family succession certificates).
  * Promoted only with explicit disclaimers; no token money accepted until converted to Category A.
* **Category C (Restricted / Rejected):**
  * Active court disputes, disputed heirship claims, inadequate public road access, or flood-prone riverbank buffer zone violations.
  * Strictly blacklisted and excluded from transaction recommendation.

## 3. Financial Integrity and AML/CFT Compliance

Modern real estate transactions must comply with national anti-money laundering regulations and banking standards:

* **Banking Channel First Policy:** All financial settlements—including earnest token deposits, milestone payments, and closing balances—must flow through verifiable commercial bank accounts. Sitakarn strictly enforces zero-cash policies to protect both buyer and seller from legal liabilities.
* **Government Valuation vs. Market Valuation:** We clarify the distinction between minimum government valuation rates (used for Land Revenue Office registration taxes and capital gains tax calculations) and prevailing commercial fair market values.
* **Transparent Fee Structure:** Clear disclosure of government stamp duties, capital gains tax (CGT), and standardized professional brokerage commissions with no hidden kickbacks.

## 4. The Structured 20-Step Closing Process

From initial property identification to the final hand-over of the registered Lal Purja in the buyer’s name, Sitakarn manages every step: drafting the preliminary agreement (Baina Patra), preparing the official deed (Rajinama), coordinating presence at the Malpot counter, and ensuring utility meter transfers.

Buying real estate should be an exhilarating milestone, not an agonizing legal gamble. Partnering with a professional, licensed intermediary ensures that your hard-earned investment is legally bulletproof from day one.
    `.trim(),
  },
  {
    id: 'blog-6',
    slug: 'sacco-loan-portfolio-management-nepal',
    title: "Managing Loan Portfolio Risk in Nepalese SACCOs",
    excerpt:
      "Savings & Credit Cooperatives in Nepal face growing loan portfolio risks tied to economic cycles. We examine the financial tools and planning approaches that successful SACCOs use to maintain healthy portfolios without compromising member services.",
    category: 'cooperative-finance',
    categoryLabel: 'Cooperative Finance',
    author: 'Sitakarn Advisory Team',
    publishedAt: '2024-06-14',
    readingTime: 6,
    imageUrl: images.blog.post6,
    featured: false,
    tags: ['SACCO', 'loan-portfolio', 'risk-management', 'cooperative'],
    body: `
In the community-based financial model of Nepal's Savings and Credit Cooperatives (SACCOs), loans represent both the primary asset generating institutional revenue and the single largest source of solvency risk. When macroeconomic headwinds, real estate illiquidity, or inflationary pressures affect members' repayment capacity, poorly managed loan portfolios can quickly trigger a liquidity crisis.

Maintaining portfolio health requires moving beyond traditional relationship-based lending to adopt data-driven credit risk assessment, rigorous monitoring protocols, and proactive recovery strategies.

## 1. Credit Risk Assessment at Origination

The best way to resolve non-performing loans (NPLs) is to ensure they are never issued in the first place. Sound origination demands three fundamental checks:

* **Cash Flow Over Collateral:** In past years, many cooperatives approved loans primarily because the member provided real estate collateral. However, illiquid collateral cannot service monthly interest. Credit committees must rigorously analyze verified business cash flows, household debt-to-income ratios, and working capital cycles.
* **Cross-Institutional Debt Verification:** Because Nepal's cooperative sector has historically lacked centralized credit information bureau (CIB) integration, credit officers must conduct thorough local field investigations to verify whether the applicant has existing credit lines with other SACCOs, microfinances, or commercial banks.
* **Valuation Conservatism:** Collateral valuations must be executed by certified independent valuers using realistic distressed-sale valuations rather than inflated speculative projections.

## 2. Institutional Monitoring via the PEARLS Framework

High-performing SACCOs benchmark their financial condition using the internationally recognized **PEARLS** monitoring system developed by the World Council of Credit Unions (WOCCU):

* **P – Protection:** Ensure 100% loan loss provisioning for delinquent loans over 12 months, and 35% provisioning for loans delinquent between 1 and 12 months.
* **E – Effective Financial Structure:** Maintain net loan portfolio between 70% and 80% of total assets, funded primarily by member deposits (70–80%) and institutional capital (minimum 10%).
* **A – Asset Quality:** Keep delinquent loan ratios strictly below 5% of the total outstanding loan portfolio.
* **R – Rates of Return & Costs:** Set loan pricing to reflect cost of funds, operational expenses, required capital reserves, and credit risk premiums.
* **L – Liquidity:** Maintain liquid reserves (cash and bank balances) equal to at least 15% to 20% of short-term member savings.
* **S – Signs of Growth:** Monitor sustainable growth rates in membership, total assets, and institutional capital.

## 3. Early Warning Indicators & Delinquency Management

Credit default rarely occurs without advance warning. Management must train credit officers to identify early warning signals:

* Missed monthly interest payments or sudden changes in member deposit frequency.
* Requests for informal tenure extensions or interest capitalization.
* Noticeable slowdown in the member's underlying commercial business or enterprise.

When delinquency occurs, early intervention within the first 15 to 30 days yields an 80%+ recovery rate. Once a loan extends beyond 90 days of default, recovery costs and legal complications multiply exponentially.

## 4. Ethical, Structured Recovery Protocols

When recovery becomes necessary, cooperatives must balance firm legal enforcement with community ethics:

* **Notice Escalation:** Follow formal statutory notification steps (35-day notice, 15-day final warning, and public notification) as authorized under the Cooperative Act 2074.
* **Transparent Collateral Auctioning:** Conduct collateral auctions with full public disclosure, fair reserve pricing, and independent legal oversight to prevent allegations of insider asset acquisition.
* **Restructuring with Discipline:** For fundamentally viable businesses experiencing temporary liquidity constraints, restructure repayment schedules only upon partial principal paydown and updated business recovery plans.

## Conclusion

Managing credit risk is not about eliminating lending—it is about managing risk intelligently so the cooperative can fulfill its mission of expanding economic opportunity for its members. By adopting disciplined appraisal, continuous PEARLS monitoring, and prompt delinquency management, Nepalese SACCOs can build resilient, sustainable institutions.
    `.trim(),
  },
];
