import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

export function DialogWithForm({ phoneNumbers, smsContent, open, setOpen }) {
  const handleOpen = () => setOpen((cur) => !cur);

  const phoneNumberList = phoneNumbers;

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[36rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            SMS Message Detail
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Phone Number List
          </Typography>
          <Card className="w-full overflow-auto max-h-36">
            <List className="p-1">
              {phoneNumberList?.map((phone, index) => (
                <ListItem key={index} className="py-1">
                  {phone}
                </ListItem>
              ))}
            </List>
          </Card>
          <Typography className="-mb-2" variant="h6">
            SMS Content
          </Typography>
          <Typography
            label="SMS Content"
            className="w-full max-h-16 break-words overflow-h-auto"
            size="lg"
          >
            {smsContent}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleOpen} fullWidth>
            OK
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
