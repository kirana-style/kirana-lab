import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  stack: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: spacing["6"],
  }),
  row: css({
    display: "flex",
    width: "100%",
    gap: spacing["2"],
  }),
  input: css({
    flex: 1,
  }),
  selectTrigger: css({
    width: spacing["32"],
  }),
  form: css({
    width: "100%",
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["4"],
  }),
}

export default function InputExample() {
  return (
    <ExampleWrapper>
      <InputBasic />
      <InputInvalid />
      <InputWithLabel />
      <InputWithDescription />
      <InputDisabled />
      <InputTypes />
      <InputWithSelect />
      <InputWithButton />
      <InputWithNativeSelect />
      <InputForm />
    </ExampleWrapper>
  )
}

function InputBasic() {
  return (
    <Example title="Basic">
      <Input type="email" placeholder="Email" />
    </Example>
  )
}

function InputInvalid() {
  return (
    <Example title="Invalid">
      <Input type="text" placeholder="Error" aria-invalid="true" />
    </Example>
  )
}

function InputWithLabel() {
  return (
    <Example title="With Label">
      <Field>
        <FieldLabel htmlFor="input-demo-email">Email</FieldLabel>
        <Input
          id="input-demo-email"
          type="email"
          placeholder="name@example.com"
        />
      </Field>
    </Example>
  )
}

function InputWithDescription() {
  return (
    <Example title="With Description">
      <Field>
        <FieldLabel htmlFor="input-demo-username">Username</FieldLabel>
        <Input
          id="input-demo-username"
          type="text"
          placeholder="Enter your username"
        />
        <FieldDescription>
          Choose a unique username for your account.
        </FieldDescription>
      </Field>
    </Example>
  )
}

function InputDisabled() {
  return (
    <Example title="Disabled">
      <Field>
        <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
        <Input
          id="input-demo-disabled"
          type="email"
          placeholder="Email"
          disabled
        />
      </Field>
    </Example>
  )
}

function InputTypes() {
  return (
    <Example title="Input Types">
      <div sx={styles.stack}>
        <Field>
          <FieldLabel htmlFor="input-demo-password">Password</FieldLabel>
          <Input
            id="input-demo-password"
            type="password"
            placeholder="Password"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-tel">Phone</FieldLabel>
          <Input
            id="input-demo-tel"
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-url">URL</FieldLabel>
          <Input
            id="input-demo-url"
            type="url"
            placeholder="https://example.com"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-search">Search</FieldLabel>
          <Input id="input-demo-search" type="search" placeholder="Search" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-number">Number</FieldLabel>
          <Input id="input-demo-number" type="number" placeholder="123" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-date">Date</FieldLabel>
          <Input id="input-demo-date" type="date" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-time">Time</FieldLabel>
          <Input id="input-demo-time" type="time" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-demo-file">File</FieldLabel>
          <Input id="input-demo-file" type="file" />
        </Field>
      </div>
    </Example>
  )
}

function InputWithSelect() {
  return (
    <Example title="With Select">
      <div sx={styles.row}>
        <Input type="text" placeholder="Enter amount" sx={styles.input} />
        <Select defaultValue="usd">
          <SelectTrigger sx={styles.selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>
  )
}

function InputWithButton() {
  return (
    <Example title="With Button">
      <div sx={styles.row}>
        <Input type="search" placeholder="Search..." sx={styles.input} />
        <Button>Search</Button>
      </div>
    </Example>
  )
}

function InputWithNativeSelect() {
  return (
    <Example title="With Native Select">
      <div sx={styles.row}>
        <Input type="tel" placeholder="(555) 123-4567" sx={styles.input} />
        <NativeSelect defaultValue="+1">
          <NativeSelectOption value="+1">+1</NativeSelectOption>
          <NativeSelectOption value="+44">+44</NativeSelectOption>
          <NativeSelectOption value="+46">+46</NativeSelectOption>
        </NativeSelect>
      </div>
    </Example>
  )
}

function InputForm() {
  return (
    <Example title="Form">
      <form sx={styles.form}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input id="form-name" type="text" placeholder="John Doe" />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              id="form-email"
              type="email"
              placeholder="john@example.com"
            />
            <FieldDescription>
              We&apos;ll never share your email with anyone.
            </FieldDescription>
          </Field>
          <div sx={styles.grid}>
            <Field>
              <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
              <Input
                id="form-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-country">Country</FieldLabel>
              <Select defaultValue="us">
                <SelectTrigger id="form-country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="form-address">Address</FieldLabel>
            <Input id="form-address" type="text" placeholder="123 Main St" />
          </Field>
          <Field orientation="horizontal">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </Example>
  )
}
