import React from "react";
import {
  CardsItem,
  CardsCard,
  CardGroup,
  CardTheme,
  CardBtn,
  CardContent,
  CardTitle,
} from "./Card.styled";
import { SkeletBox } from "./CardSkelet.styled";

export const CardSkelet = () => {
  return (
    <CardsItem>
      <CardsCard>
        <CardGroup>
          <SkeletBox width="82px" height="20px"/>
          <CardBtn>
            <SkeletBox width="18px" height="4px"/>
          </CardBtn>
        </CardGroup>
        <CardContent>
          <CardTitle as="h3">
            <SkeletBox width="113px" height="18px" />
          </CardTitle>
          <SkeletBox width="58px" height="13px" />
        </CardContent>
      </CardsCard>
    </CardsItem>
  );
};
