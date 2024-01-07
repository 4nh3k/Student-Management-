import { Spinner } from 'flowbite-react';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function LoadingIndicator({
  size = 'xl'
}: LoadingIndicatorProps) {
  return (
    <div className='flex h-full w-full flex-1 items-center justify-center'>
      <Spinner aria-label='Loading Data' size={size} />
    </div>
  );
}
