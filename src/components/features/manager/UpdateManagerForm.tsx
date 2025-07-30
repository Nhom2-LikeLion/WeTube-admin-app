import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFRegisterFormSchema } from "@/schema/RHFRegisterForm.schama";
import type { RHFRegisterFormValues } from "../../../types/managerTypes/registerManager";

interface Props {
  defaultValues: RHFRegisterFormValues;
  onSubmit: (data: RHFRegisterFormValues) => void;
  isLoading: boolean;
}

export const UpdateManagerForm: React.FC<Props> = ({ defaultValues, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RHFRegisterFormValues>({
    resolver: yupResolver(RHFRegisterFormSchema),
    defaultValues: defaultValues,
  });

  const submit: SubmitHandler<RHFRegisterFormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} 
    className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Manager Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register("name")} placeholder="Full Name" className="p-2 border rounded-md" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input {...register("email")} placeholder="Email" className="p-2 border rounded-md" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input {...register("phone")} placeholder="Phone Number" className="p-2 border rounded-md" />
        <input {...register("dateOfBirth")} type="date" placeholder="Date of Birth" className="p-2 border rounded-md" />

        <select {...register("gender")} className="p-2 border rounded-md">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select {...register("status")} className="p-2 border rounded-md">
          <option value="Pending">Pending</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-md text-white font-medium ${
          isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};
