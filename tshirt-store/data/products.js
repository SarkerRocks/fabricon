import Image from 'next/image'

// Inside your Product Card component
<Image 
  src={product.image} 
  alt={product.name}
  width={400} 
  height={500}
  style={{ objectFit: 'cover', borderRadius: '4px' }}
/>