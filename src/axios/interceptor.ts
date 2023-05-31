import CoockiesService from "@src/services/auth/CoockieService";
export const interceptor = (axios) => {
    const cookiesService = new CoockiesService();
    //Request
    axios.interceptors.request.use(async (config) => {
        // eslint-disable-next-line no-debugger
        let token = cookiesService.getToken();
        if (config["url"] === "/auth/refresh") {
            token = cookiesService.getRefreshToken();
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.Accept = "application/json";
        return config;
    }, (error) => {
        console.error("Interceptor error response" + error);
        throw new Error(error);
    });
    //Response
    axios.interceptors.response.use((response) => {
        const url = response.request.responseURL;
        //Set user
        if (url.includes("/manager")) {
            cookiesService.saveAdmin(response.data.user);
        }
        //Get token e token Refresh in route me e refresh
        if (url.includes("/auth/me") || url.includes("/auth/refresh")) {
            if (url.includes("/auth/me")) {
                cookiesService.saveAdmin(response.data.user);
            }
            cookiesService.saveToken(response.data.accessToken);
            cookiesService.saveRefreshToken(response.data.refreshToken);
        }
        return response;
    }, async (error) => {
        const access_token = cookiesService.getToken();
        if (error?.response.status === 403 ||
            (error?.response.status === 401 && access_token)) {
            const response = await refreshToken(error);
            return response;
        }
        return Promise.reject(error);
    });
    async function refreshToken(error) {
        return new Promise((resolve, reject) => {
            const refresh_token = cookiesService.getRefreshToken();
            const header = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refresh_token}`,
            };
            const parameters = {
                headers: header,
            };
            axios
                .get("/auth/refresh", parameters)
                .then(async (res) => {
                cookiesService.saveToken(res.data.accessToken);
                cookiesService.saveRefreshToken(res.data.refreshToken);
                // Fazer algo caso seja feito o refresh token
                return resolve(res);
            })
                .catch(() => {
                return reject(error);
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmNlcHRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxlQUFlLE1BQU0sbUNBQW1DLENBQUM7QUFHaEUsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7SUFDMUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUM3QyxTQUFTO0lBQ1QsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUM1QixLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDZix1Q0FBdUM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLGVBQWUsRUFBRTtZQUNyQyxLQUFLLEdBQUcsY0FBYyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLEtBQUssRUFBRSxDQUFDO1NBQ2xEO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUM7UUFDM0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUNGLENBQUM7SUFFRixVQUFVO0lBQ1YsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUM3QixDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ1gsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDekMsVUFBVTtRQUNWLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1QixjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxpREFBaUQ7UUFDakQsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QixjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUM7WUFDRCxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEQsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0Q7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDLEVBQ0QsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2QsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9DLElBQ0UsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRztZQUM5QixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFDaEQ7WUFDQSxNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQ0YsQ0FBQztJQUVGLEtBQUssVUFBVSxZQUFZLENBQUMsS0FBSztRQUMvQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2RCxNQUFNLE1BQU0sR0FBRztnQkFDYixjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxhQUFhLEVBQUUsVUFBVSxhQUFhLEVBQUU7YUFDekMsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixPQUFPLEVBQUUsTUFBTTthQUNoQixDQUFDO1lBQ0YsS0FBSztpQkFDRixHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztpQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDbEIsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMvQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkQsNkNBQTZDO2dCQUM3QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDVixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMsQ0FBQyJ9