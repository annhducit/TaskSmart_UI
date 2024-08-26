import { tsmAxios } from "@/configs/axios";
import { getIdProjectFromUrl } from "@/shared/components/getIdByUrl";
import { useQuery } from "@tanstack/react-query";

const generateTask = async (projectId: string) => {
    const {data} = await tsmAxios.get<ListCard[]>(`/projects/${projectId}/generate-task`);
    return data    
}

const useGenerateTask = () => {
    const projectId = getIdProjectFromUrl();
    return useQuery({
        queryKey: ['tsm/project/generate-task', projectId],
        queryFn: () => generateTask(projectId)
    })
}


export default useGenerateTask;
// const generateTask = () => {
//     const generateAsync = async () => {
//       try {
//         const res = await tsmAxios.get(`/projects/${project?.id}/generate-task`);
//         if (res.data) {
//           setTaskGenerate(res.data.listCards);
//           console.log(res.data);
//         }
//       } catch (error) {
//         message.error(error as string);
//       }
//     };
//     generateAsync();
//   }