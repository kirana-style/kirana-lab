import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Camera01Icon,
  CloudUploadIcon,
  Globe02Icon,
  PlusSignCircleIcon,
} from "@hugeicons/core-free-icons"

export function SocialLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="spotify-url">Spotify Artist URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={PlusSignCircleIcon}
                />
              </InputGroupAddon>
              <InputGroupInput
                id="spotify-url"
                defaultValue="spotify.com/artist/3j...2k"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="instagram-handle">Instagram Handle</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={Camera01Icon}
                />
              </InputGroupAddon>
              <InputGroupInput
                id="instagram-handle"
                defaultValue="@julianduryea_music"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="soundcloud-url">SoundCloud URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={CloudUploadIcon}
                />
              </InputGroupAddon>
              <InputGroupInput
                id="soundcloud-url"
                placeholder="soundcloud.com/username"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="website-url">Website</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={Globe02Icon}
                />
              </InputGroupAddon>
              <InputGroupInput
                id="website-url"
                placeholder="https://yoursite.com"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="secondary" className="">
          Discard
        </Button>
        <Button className="">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
