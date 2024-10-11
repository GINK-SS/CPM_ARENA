import FAQItem from './faq-item';

export default function FAQ() {
  const faqData: {
    question: string;
    answer: string[];
  }[] = require('@/public/storage/faq.json');

  return (
    <div>
      <h2 className='mb-20 text-25 font-semibold tablet:mb-30 tablet:text-30'>
        자주 묻는 질문 (<span className='indent-2 tracking-[2px]'>FAQ</span>)
      </h2>

      {faqData.map((faq, idx) => (
        <FAQItem key={idx} {...faq} isLast={idx === 4} />
      ))}
    </div>
  );
}
