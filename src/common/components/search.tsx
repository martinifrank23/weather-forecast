import { useState, useCallback } from "react";
import { CircularProgress, TextField, Autocomplete } from "@mui/material";
import { debounce } from "@/common/utils/utils";

interface props {
  onSearchChanged: any;
}

export default function Search({ onSearchChanged }: props) {
  const [value, setValue] = useState<any>();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = async (location: string) => {
    setLoading(true);
    fetch(`/api/geo?prefix=${location}`)
      .then((res) => res.json())
      .then((res) => {
        setOptions(
          res.data.map((city: any) => ({
            label: `${city.name}, ${city.regionCode}, ${city.countryCode}`,
            latitude: city.latitude,
            longitude: city.longitude,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const changeHandler = (event: any, newInputValue: string) => {
    if (newInputValue != "") {
      loadOptions(newInputValue);
    }
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 600), []);

  return (
    <Autocomplete
      className="searchbar"
      options={options}
      value={value}
      onChange={(_, newValue: any) => {
        setValue(newValue);
        onSearchChanged(newValue);
      }}
      onInputChange={debouncedChangeHandler}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search City"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
