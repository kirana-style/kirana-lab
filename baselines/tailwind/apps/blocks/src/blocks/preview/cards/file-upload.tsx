import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { HugeiconsIcon } from "@hugeicons/react"
import { CloudUploadIcon } from "@hugeicons/core-free-icons"

export function FileUpload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>Drag and drop or browse</CardDescription>
      </CardHeader>
      <CardContent>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon
                strokeWidth={2}

                icon={CloudUploadIcon}
              />
            </EmptyMedia>
            <EmptyTitle>Upload files</EmptyTitle>
            <EmptyDescription>PNG, JPG, PDF up to 10MB</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Browse Files</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
