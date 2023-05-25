import { useQuery } from "react-query";
import AxiosRequest from "../axiosRequests/axiosRequests";
import CoockiesService from "./CoockieService";
import { useEffect, useState } from "react";

const AdminService = (data) => {
  const [admin, setAdmin] = useState(data);
  const userRequest = new AxiosRequest();
  const userService = new CoockiesService();
  const user = userService.getAdmin();
  const query = useQuery({
    queryKey: "Admin",
    queryFn: async () =>
      await userRequest.get({ url: `/administrador/${user.id}` }),
  });

  useEffect(() => {
    if (!query.error) setAdmin(query.data);
  }, [query]);

  return [admin, setAdmin];
};

export default AdminService;
