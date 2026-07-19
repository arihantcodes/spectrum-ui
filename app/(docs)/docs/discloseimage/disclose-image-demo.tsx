import DiscloseImage from '@/components/spectrumui/discloseimage';

export default function DiscloseImageDemo() {
  return (
    <div className="mt-6 flex justify-center">
      <DiscloseImage
        alt="Abstract green shapes"
        vertical
        doorClassName="bg-primary"
        src="https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3"
      />
    </div>
  );
}
