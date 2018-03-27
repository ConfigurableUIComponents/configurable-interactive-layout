/* eslint-disable */

import each from 'lodash/each';
import cloneDeep from 'lodash/cloneDeep';
import unset from 'lodash/unset';
import { defaultLayoutConfiguration } from './defaultLayoutConfiguration';

function getNextAvailableRow(cards, breakpoint) {
  let maxRow = 0;
  each(cards, card => {
    const y = card[breakpoint].y;
    const h = card[breakpoint].h; // card height
    const nextRow = y + h;
    if(nextRow > maxRow) maxRow = nextRow;
  });
  return maxRow;
}

export function addCardInNewRow(currentCardsConfiguration, newCard){
  const cardsConfiguration = cloneDeep(currentCardsConfiguration);
  const cards = cardsConfiguration.cards;
  const cardToAdd = cloneDeep(newCard);
  each(defaultLayoutConfiguration.breakpoints, breakpoint => {
    const breakpointId = breakpoint.id;
    const nextAvailableRow = getNextAvailableRow(cards, breakpointId);
    cardToAdd.configuration[breakpointId].y = nextAvailableRow;
    cardToAdd.configuration[breakpointId].x = 0;
  });
  cards[cardToAdd.id] = cardToAdd.configuration;
  return cardsConfiguration;
}

export function removeCard(currentCardsConfiguration, cardId){
  const cardsConfiguration = cloneDeep(currentCardsConfiguration);
  const cards = cardsConfiguration.cards;
  unset(cards, cardId);
  return cardsConfiguration;
}

export function convertCardsToLayouts(cards, breakpoints) {
  const layouts = {};
  each(breakpoints, (breakpoint, breakpointId) => {
    layouts[breakpointId] = [];
    each(cards, (card, cardId) => {
      const newCard = card[breakpointId];
      newCard.i = cardId;
      layouts[breakpointId].push(newCard);
    })
  });
  return layouts;
}

export function convertLayoutToCards (breakpoint, updatedLayout, originalCards) {
  each(updatedLayout, (card) => {
    const cardId = card.i;
    const cardLayout = {
      "w": card.w,
      "h": card.h,
      "x": card.x,
      "y": card.y
    };
    originalCards[cardId][breakpoint] = cardLayout;
  });
}