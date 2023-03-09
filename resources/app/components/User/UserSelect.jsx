import {useEffect, useState} from "react";
import AsyncSelect from 'react-select/async';


export default ({defaultOptions, onChange}) => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(async () => {
        try {
            setIsLoaded(false);
            const res = await fetch("/api/admin/users?res_type=full");
            const result = res.json();
            setIsLoaded(true);
            setUsers(result.data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }, [])
    const loadOptions = async (inputValue) => {
        try {
            const res = await fetch("/api/admin/users?res_type=full&search=" + inputValue);
            const result = res.json();
            return result.data.map(item => ({
                label: item.name,
                value: item.id
            }))
        } catch (error) {
            setError(error);
        }
    }

    return <AsyncSelect
        cacheOptions
        onChange={onChange}
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
    />
}
