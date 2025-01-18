import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How does Tournament Hub ensure fair play?",
    answer:
      "We use blockchain-based smart contracts to enforce rules and distribute rewards transparently, eliminating human bias and errors.",
    value: "item-1",
  },
  {
    question: "Can I customize tournament formats on the platform?",
    answer:
      "Yes, Tournament Hub supports multiple formats including single-elimination, double-elimination, and round-robin tournaments.",
    value: "item-2",
  },
  {
    question: "How are token rewards distributed?",
    answer:
      "Token rewards are automatically distributed via smart contracts once the tournament results are finalized.",
    value: "item-3",
  },
  {
    question: "Is there a mobile version of Tournament Hub?",
    answer:
      "Yes, our platform is accessible via both web and mobile devices for seamless tournament management on the go.",
    value: "item-4",
  },
  {
    question: "What kind of analytics does Tournament Hub provide?",
    answer:
      "We offer performance metrics, participant stats, and historical trends to help organizers optimize their tournaments.",
    value: "item-5",
  },
  {
    question: "Can sponsors get insights from tournaments?",
    answer:
      "Absolutely! Sponsors can access analytics and engagement data to maximize their ROI.",
    value: "item-6",
  },
  {
    question: "Is there support for cross-platform integration?",
    answer:
      "Yes, Tournament Hub can be integrated with third-party tools and platforms via APIs.",
    value: "item-7",
  },
  {
    question: "How secure is the platform?",
    answer:
      "We use advanced encryption and blockchain technology to ensure all data and transactions are secure.",
    value: "item-8",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
