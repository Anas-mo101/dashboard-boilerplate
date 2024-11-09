import { Button } from "@tremor/react";
import { DialogHeader, Dialog, DialogFooter, DialogClose, DialogTrigger, DialogTitle, DialogContent, DialogDescription } from "./BaseDialog";
import { ReactNode } from "react";


interface ConfirmationDialogProps {
  title: string;
  desc: string;
  cancelText: string;
  confrimText: string;
  onConfrim: () => void;
  trigger: ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle> {props.title} </DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            {props.desc}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              className="mt-2 w-full sm:mt-0 sm:w-fit"
              variant="secondary"
            >
              {props.cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-full sm:w-fit" onClick={props.onConfrim}>{props.confrimText}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;