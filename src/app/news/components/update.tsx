import UpdateItem from './update-item';

export default function Update() {
  const updateData: {
    date: string;
    version: string;
    contents: { title: string; descriptions: string[] | null }[];
  }[] = require('@/public/storage/update.json');

  return (
    <div>
      <h2 className='mb-20 text-25 font-semibold tablet:mb-30 tablet:text-30'>업데이트 내역</h2>

      {updateData.map((update, idx) => (
        <UpdateItem key={idx} {...update} isFirst={idx === 0} />
      ))}
    </div>
  );
}
