import React from "react";
import style from "./Card.module.scss";
import Text from "../Text/Text";
import classNames from "classnames";

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Вложенные внутри тега другие элементы, например NavLink */
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  children,
}) => {
  return (
    <div className={classNames(className, style.wrapper)} onClick={onClick}>
      <img className={style.image} src={image} alt={String(title) || ""} />
      <div className={style.content}>
        {captionSlot && (
          <Text tag="span" view="p-14" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text tag="h1" view="p-18" weight="bold" maxLines={2}>
          {title}
        </Text>
        <Text tag="p" view="p-14" color="secondary" maxLines={3}>
          {subtitle}
        </Text>
        <div className={style.footer}>
          {contentSlot && (
            <Text tag="span" view="p-16" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
