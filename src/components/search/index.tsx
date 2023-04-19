import React from "react";
import AsyncSelect from "react-select/async";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import debounce from "lodash/debounce";
import { IOrgRepos, ISearch } from "../types";
import styles from "./search.module.css";

const Search = (props: ISearch) => {
    const [repos, setRepos] = React.useState<IOrgRepos[] | []>([]);
    const [selectedRepo, setSelectedRepos] = React.useState<IOrgRepos | null>(
        null
    );

    const promiseOptions = debounce(
        (inputValue: string, callback: (data: IOrgRepos[] | []) => void) => {
            const githubURL = `https://api.github.com/search/repositories?q=${inputValue}`;
            if (inputValue) {
                fetch(githubURL, {
                    method: "GET",
                    headers: {
                        Authorization:
                            "bearer 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",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let repoData = data.items.map((v: IOrgRepos) => {
                            return {
                                id: `${v.id}`,
                                fullName: v.full_name,
                                createdAt: v.created_at,
                                stargazersCount: v.stargazers_count,
                                language: v.language,
                                url: v.url,
                                label: (
                                    <>
                                        <div className={styles.label}>
                                            <p>{v.full_name}</p>
                                            <p>{`\u{2605} ${v.stargazers_count}`}</p>
                                        </div>
                                        <div className={styles.label}>
                                            <p>{v.description}</p>
                                            <p>{v.language}</p>
                                        </div>
                                    </>
                                ),
                                value: v.id,
                            };
                        });

                        callback(repoData);
                        setRepos(repoData);
                    });
            }
        },
        500
    );

    return (
        <div className={styles.searchParent}>
            <AsyncSelect
                cacheOptions
                defaultOptions={repos}
                placeholder={"Search repos..."}
                loadOptions={promiseOptions}
                isClearable
                onChange={(e: IOrgRepos | null) => {
                    setSelectedRepos(e);
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: "48px",
                    }),
                }}
            />
            <IconButton
                disabled={
                    selectedRepo && props.data.length < 10 ? false : true
                }
                onClick={() => props.save(selectedRepo)}
            >
                <AddCircleIcon />
            </IconButton>
        </div>
    );
};

export default Search;
