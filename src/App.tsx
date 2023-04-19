import React from "react";
import Search from "./components/search";
import Table from "./components/table";
import { IOrgRepos } from "./components/types";

const App = () => {
    const [repos, setRepos] = React.useState<IOrgRepos[] | []>([]);
    const repoServerUrl = `http://localhost:8080/repo/`;

    React.useEffect(() => {
        getRepos();
    }, []);

    const getRepos = () => {
        fetch(repoServerUrl, {
            method: "GET",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong");
            })
            .then((data) => {
                if (data?.repos?.length > 0) {
                    setRepos(data.repos);
                }
            })
            .catch((error) => {
                alert(error);
            });
    };

    const saveRepo = (data: IOrgRepos | null) => {
        if (data) {
            let newRepoList: IOrgRepos[] = [...repos, data];
            setRepos(newRepoList);
            fetch(repoServerUrl, {
                method: "POST",
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.ok) {
                        return;
                    }
                    throw new Error("Something went wrong");
                })
                .catch((error) => {
                    alert(error);
                    getRepos();
                });
        }
    };

    const deleteRepo = (dataId: string) => {
        let newRepoList: IOrgRepos[] = repos.filter(
            (v: IOrgRepos) => `${v.id}` !== dataId
        );
        setRepos(newRepoList);
        fetch(`${repoServerUrl}/${dataId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    return;
                }
                throw new Error("Something went wrong");
            })
            .catch((error) => {
                alert(error);
                getRepos();
            });
    };

    return (
        <div className="parent" >
            <Search data={repos} save={saveRepo} />
            <Table data={repos} delete={deleteRepo} />
        </div>
    );
};

export default App;
