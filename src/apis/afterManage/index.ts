import { instance } from "..";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/utils/auth";

interface Type {
  grade: number;
  classNum: number;
  num: number;
  name: string;
}

export const After = () => {
  const accessToken = getToken();

  return useMutation<null, Error, Type>({
    mutationFn: async (param: Type) => {
      try {
        const response = await instance.post(
          "after",
          {
            grade: param.grade,
            class_num: param.classNum,
            num: param.num,
            name: param.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to perform mutation");
      }
    },
  });
};
