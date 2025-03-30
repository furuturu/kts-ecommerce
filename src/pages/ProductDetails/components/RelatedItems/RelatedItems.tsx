import { ProductCategory } from "types/types.ts";
import Text from "../../../../components/Text";

interface RelatedItemsProps {
  productCategory: ProductCategory;
}

export const RelatedItems = ({ productCategory }: RelatedItemsProps) => {
  return (
    <Text tag="h2" weight="bold" view="title">
      Related Items {productCategory.title}
    </Text>
  );
};
