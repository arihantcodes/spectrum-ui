import type { ComponentType } from "react"

import { AccordionFooter } from "./accordion-footer"
import { AiPromptFooter } from "./ai-prompt-footer"
import { BentoFooter } from "./bento-footer"
import { CloudStatusFooter } from "./cloud-status-footer"
import { CommercePlatformFooter } from "./commerce-platform-footer"
import { ContextualCtaFooter } from "./contextual-cta-footer"
import { ConversionSaasFooter } from "./conversion-saas-footer"
import { CreativeStudioFooter } from "./creative-studio-footer"
import { CybersecurityFooter } from "./cybersecurity-footer"
import { DeveloperCloudFooter } from "./developer-cloud-footer"
import { DeveloperDocsFooter } from "./developer-docs-footer"
import { EditorialFooter } from "./editorial-footer"
import { EducationPlatformFooter } from "./education-platform-footer"
import { EnterpriseGridFooter } from "./enterprise-grid-footer"
import { ExperimentalAuroraFooter } from "./experimental-aurora-footer"
import { FintechTrustFooter } from "./fintech-trust-footer"
import { GlobalNetworkFooter } from "./global-network-footer"
import { HealthcarePrivacyFooter } from "./healthcare-privacy-footer"
import { MarketDataFooter } from "./market-data-footer"
import { MarketplaceFooter } from "./marketplace-footer"
import { OpenSourceFooter } from "./open-source-footer"
import { ProductSwitcherFooter } from "./product-switcher-footer"
import { ProductivityFooter } from "./productivity-footer"
import { StartupWaitlistFooter } from "./startup-waitlist-footer"
import { TypographyFooter } from "./typography-footer"
import type { SpectrumFooterProps } from "./types"

export const FOOTER_COMPONENTS: Record<string, ComponentType<SpectrumFooterProps>> = {
  "enterprise-grid": EnterpriseGridFooter,
  "conversion-saas": ConversionSaasFooter,
  "developer-cloud": DeveloperCloudFooter,
  "fintech-trust": FintechTrustFooter,
  "ai-prompt": AiPromptFooter,
  "product-switcher": ProductSwitcherFooter,
  "global-network": GlobalNetworkFooter,
  editorial: EditorialFooter,
  "commerce-platform": CommercePlatformFooter,
  "developer-docs": DeveloperDocsFooter,
  cybersecurity: CybersecurityFooter,
  "creative-studio": CreativeStudioFooter,
  productivity: ProductivityFooter,
  "startup-waitlist": StartupWaitlistFooter,
  marketplace: MarketplaceFooter,
  "open-source": OpenSourceFooter,
  "cloud-status": CloudStatusFooter,
  "healthcare-privacy": HealthcarePrivacyFooter,
  "education-platform": EducationPlatformFooter,
  "market-data": MarketDataFooter,
  bento: BentoFooter,
  typography: TypographyFooter,
  accordion: AccordionFooter,
  "contextual-cta": ContextualCtaFooter,
  "experimental-aurora": ExperimentalAuroraFooter,
}
