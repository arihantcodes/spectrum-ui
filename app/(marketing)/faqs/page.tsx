import { FAQSection } from "@/components/faq-section"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function FAQPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="pt-8">
        <BreadcrumbNav 
          items={[{ label: 'Frequently Asked Questions' }]} 
          className="mb-6"
        />
        <FAQSection />
      </div>
    </div>
  )
}
