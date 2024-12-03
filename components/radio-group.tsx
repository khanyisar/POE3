import { Label, RadioGroup, XStack } from 'tamagui';

import React from "react"
import type { SizeTokens } from 'tamagui';

export function RadioGroupItemWithLabel(props: {
    size: SizeTokens
    value: string
    label: string
  }) {
    const id = `radiogroup-${props.value}`
    return (
      <XStack width={100} alignItems="center" space="$4">
        <RadioGroup.Item value={props.value} id={id} size={props.size}>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
  
        <Label size={props.size} htmlFor={id}>
          {props.label}
        </Label>
      </XStack>
    )
  }