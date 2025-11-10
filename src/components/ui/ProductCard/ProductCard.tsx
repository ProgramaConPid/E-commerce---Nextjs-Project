import { ProductCardProps } from '@/interfaces/main'
import styles from "@/components/ui/ProductCard/product.module.css"
import Image from 'next/image'
import { nunitoSans, raleway } from '@/app/fonts/mainFonts'

const ProductCard = ({
  _id,
  heartIcon,
  images,
  name,
  price,
  button,
  onClick,
  onFavorite
}: ProductCardProps) => {
  return (
    <div onClick={onClick} className={styles.product__card} id={_id}>
      <div onClick={onFavorite} className={styles.heartIcon__container}>
        {heartIcon}
      </div>
      <Image className={styles.product__image} src={images} alt='Product Image' width={200} height={200} />
      <h3 className={`${styles.product__cardTitle} ${raleway.className}`}>
        {name}
      </h3>
      <span className={`${styles.product__cardPrice} ${nunitoSans.className}`}>
        ${price}
      </span>
      {button}
    </div>
  )
}

export default ProductCard;