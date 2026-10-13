import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Slider } from "@workspace/ui/components/slider"
import { Switch } from "@workspace/ui/components/switch"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  Clock03Icon,
  Sun03Icon,
  ThermometerWarmIcon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  },
  text: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  },
  toggleGroup: {
    flexWrap: "wrap",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  itemTitle: {
    flexShrink: 0,
  },
  itemActions: {
    flex: 1,
  },
  slider: {
    width: "100%",
  },
})

const SCENES = {
  cooking: { brightness: [90], colorTemp: [70], volume: [30], fade: [0] },
  dining: { brightness: [50], colorTemp: [40], volume: [20], fade: [60] },
  nightlight: { brightness: [15], colorTemp: [20], volume: [0], fade: [80] },
  focus: { brightness: [100], colorTemp: [85], volume: [0], fade: [0] },
} as const

export function KitchenIsland() {
  const [enabled, setEnabled] = React.useState(true)
  const [scene, setScene] = React.useState("cooking")
  const [brightness, setBrightness] = React.useState([90])
  const [colorTemp, setColorTemp] = React.useState([70])
  const [volume, setVolume] = React.useState([30])
  const [fade, setFade] = React.useState([0])

  const handleSceneChange = (value: string) => {
    if (!value) return
    setScene(value)
    const preset = SCENES[value as keyof typeof SCENES]
    setBrightness([...preset.brightness])
    setColorTemp([...preset.colorTemp])
    setVolume([...preset.volume])
    setFade([...preset.fade])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kitchen Island</CardTitle>
        <CardDescription>Hue Color Ambient</CardDescription>
        <CardAction>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.stack}>
          <span sx={styles.text}>Scenes</span>
          <ToggleGroup
            value={[scene]}
            onValueChange={(value) => handleSceneChange(value[0] ?? "cooking")}
            variant="outline"
            spacing={1}
            sx={styles.toggleGroup}
          >
            <ToggleGroupItem value="cooking" disabled={!enabled}>
              Cooking
            </ToggleGroupItem>
            <ToggleGroupItem value="dining" disabled={!enabled}>
              Dining
            </ToggleGroupItem>
            <ToggleGroupItem value="nightlight" disabled={!enabled}>
              Nightlight
            </ToggleGroupItem>
            <ToggleGroupItem value="focus" disabled={!enabled}>
              Focus
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ItemGroup>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <Icon icon={Sun03Icon} />
            </ItemMedia>
            <ItemContent sx={styles.itemContent}>
              <ItemTitle sx={styles.itemTitle}>Brightness</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <Slider
                value={brightness}
                onValueChange={(value) =>
                  setBrightness(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
                sx={styles.slider}
              />
            </ItemActions>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <Icon icon={ThermometerWarmIcon} />
            </ItemMedia>
            <ItemContent sx={styles.itemContent}>
              <ItemTitle sx={styles.itemTitle}>Color Temp</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <Slider
                value={colorTemp}
                onValueChange={(value) =>
                  setColorTemp(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
              />
            </ItemActions>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <Icon icon={VolumeHighIcon} />
            </ItemMedia>
            <ItemContent sx={styles.itemContent}>
              <ItemTitle sx={styles.itemTitle}>Volume</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <Slider
                value={volume}
                onValueChange={(value) =>
                  setVolume(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
              />
            </ItemActions>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <Icon icon={Clock03Icon} />
            </ItemMedia>
            <ItemContent sx={styles.itemContent}>
              <ItemTitle sx={styles.itemTitle}>Fade</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <Slider
                value={fade}
                onValueChange={(value) =>
                  setFade(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
              />
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
