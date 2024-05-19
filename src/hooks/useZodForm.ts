import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import type { Schema } from "zod";

export function useZodForm<
  TFieldValues extends FieldValues,
  TSchema extends Schema<any, any> = Schema<any, any>,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props: Omit<UseFormProps<TFieldValues, TContext>, "resolver">,
  schema: TSchema,
): UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  return useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: zodResolver(schema),
  });
}
