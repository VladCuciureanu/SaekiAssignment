"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

type InputFieldDynamicityProps =
  | {
      readOnly?: false;
      onChange: (value: string) => void;
    }
  | {
      readOnly: true;
    };
type InputFieldProps = {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  value: string;
} & InputFieldDynamicityProps;

export function InputField(props: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {props.label && (
        <Label htmlFor="input-first-name" className="flex flex-row">
          {props.label}
          {props.required && <b className="font-bold ml-0.5 text-red-400">*</b>}
        </Label>
      )}
      <Input
        type="text"
        id={`input-${props.id}`}
        name={`input-${props.id}`}
        placeholder={props.placeholder}
        className="w-full"
        value={props.value}
        readOnly={props.readOnly}
        onChange={(ev) => {
          if (!props.readOnly) {
            props.onChange(ev.target.value);
          }
        }}
      />
    </div>
  );
}
