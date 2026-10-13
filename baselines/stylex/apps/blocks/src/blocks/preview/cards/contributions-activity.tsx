import * as stylex from "@stylexjs/stylex"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field"
import { theme } from "@workspace/ui/theme/semantic.stylex"

const styles = stylex.create({
  fieldLegend: {
    position: "absolute",
    width: "1px",
    height: "1px",
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    marginTop: "-1px",
    marginBottom: "-1px",
    marginInlineStart: "-1px",
    marginInlineEnd: "-1px",
    overflowX: "hidden",
    overflowY: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderInlineStartWidth: 0,
    borderInlineEndWidth: 0,
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
})

export function ContributionsActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributions & Activity</CardTitle>
        <CardDescription>
          Manage your contributions and activity visibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contributions-activity">
          <FieldGroup>
            <FieldSet>
              <FieldLegend sx={styles.fieldLegend}>
                Contributions & activity
              </FieldLegend>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox id="activity-private-profile" />
                  <FieldContent>
                    <FieldLabel htmlFor="activity-private-profile">
                      Make profile private and hide activity
                    </FieldLabel>
                    <FieldDescription>
                      Enabling this will hide your contributions and activity
                      from your GitHub profile and from social features like
                      followers, stars, feeds, leaderboards and releases.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="contributions-activity">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
