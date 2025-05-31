import React, {useEffect, useRef, useState} from "react";

const AddableSelectField = React.memo(
    ({
         name,
         label,
         description,
         options,
         values = [],
         onChange,
         customOptionsAllowed,
         subFieldOptions = [],
         style,
     }) => {
        const [dropdownVisible, setDropdownVisible] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
        const [customOption, setCustomOption] = useState("");
        const dropdownRef = useRef(null);
        const safeOptions = options.map((option) => ({
            ...option,
            overrides: option.overrides || [],
        }));

        const handleAddClick = () => {
            setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
        };

        const handleOptionClick = (_option) => {
            const option = {
                ..._option,
                subValue: subFieldOptions[0] ?? null,
            };

            let newSelectedItems = undefined;
            const isOverridden = values.some((item) =>
                item.overrides?.includes(option.name)
            );
            if (isOverridden) newSelectedItems = values;
            else {
                newSelectedItems = [
                    ...values.filter((item) => !option.overrides.includes(item.name)),
                    option,
                ];
            }

            onChange(name, newSelectedItems);
            setDropdownVisible(false);
            setCustomOption("");
        };

        const handleBatchAdd = (optionsToAdd) => {
            let newSelectedItems = [...values];

            optionsToAdd.forEach((_option) => {
                const option = {
                    ..._option,
                    subValue: subFieldOptions[0] ?? null,
                };

                const isAlreadySelected = newSelectedItems.some(
                    (item) => item.name === option.name
                );
                const isOverridden = newSelectedItems.some((item) =>
                    item.overrides.includes(option.name)
                );

                if (!isAlreadySelected && !isOverridden) {
                    newSelectedItems = newSelectedItems.filter(
                        (item) => !option.overrides.includes(item.name)
                    );
                    newSelectedItems.push(option);
                }
            });

            onChange(name, newSelectedItems);
            setDropdownVisible(false);
            setCustomOption("");
        };

        const handleChangeSubValue = (index, newValue) => {
            const updated = [...values];
            updated[index] = {...updated[index], subValue: newValue};
            onChange(name, updated);
        }

        const handleRemove = (item) => {
            const newSelectedItems = values.filter(
                (selected) => selected.name !== item.name
            );
            onChange(name, newSelectedItems);
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setDropdownVisible(false);
            }
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        useEffect(() => {
            if (!dropdownVisible) {
                setSearchQuery("");
                setCustomOption("");
            }
        }, [dropdownVisible]);

        useEffect(() => {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        const availableOptions = safeOptions.filter(
            (option) =>
                !values.some((selected) => selected.name === option.name) &&
                (!option.overrides ||
                    !values.some((selected) =>
                        selected.overrides?.includes(option.name)
                    )) &&
                option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    position: "relative",
                    ...style,
                }}
            >
                <label className="input-label">
                    {label}
                    <div className="tooltip-bubble">{description}</div>
                </label>
                <button
                    className="clear-all-btn"
                    onClick={() => onChange(name, [])}
                    title="Clear All"
                >
                    🗑️
                </button>
                <div className="addable-select-field">
                    {values.map((item, index) => (
                        <div className="tag" key={item.name}>
                            {subFieldOptions.length > 0 && (
                                <select
                                    className="subvalue-select"
                                    value={item.subValue}
                                    onChange={(e) => handleChangeSubValue(index, e.target.value)}
                                >
                                    {subFieldOptions.map((opt) => (
                                        <option key={opt.name} value={opt.name}>{opt.label}</option>
                                    ))}
                                </select>
                            )}
                            {item.label}
                            {item.description && (
                                <div className="tooltip-bubble">{item.description}</div>
                            )}
                            <button className="remove-btn" onClick={() => handleRemove(item)}>
                                ×
                            </button>
                        </div>
                    ))}
                    <div className="field-actions" ref={dropdownRef}>
                        {(availableOptions.length !== 0 ||
                            searchQuery !== "" ||
                            customOptionsAllowed) && (
                            <button className="add-btn" onClick={handleAddClick}>
                                +
                            </button>
                        )}

                        {dropdownVisible && (
                            <div className="dropdown-options">
                                {(searchQuery !== "" || availableOptions.length !== 0) && (
                                    <div style={{position: "relative"}}>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                marginBottom: "8px",
                                                width: "calc(100% - 30px)",
                                            }}
                                        />
                                        {/* Batch Add Button */}
                                        {availableOptions.length > 0 && searchQuery !== "" && (
                                            <button
                                                className="batch-add-btn-inline"
                                                onClick={() => handleBatchAdd(availableOptions)}
                                            >
                                                ➕
                                            </button>
                                        )}
                                    </div>
                                )}
                                {availableOptions.map((option) => (
                                    <div
                                        key={option.name}
                                        className="dropdown-option"
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                                {availableOptions.length === 0 && searchQuery !== "" && (
                                    <div
                                        className="dropdown-option"
                                        style={{color: "var(--text-secondary)"}}
                                    >
                                        No option found
                                    </div>
                                )}
                                {customOptionsAllowed && (
                                    <div
                                        style={{marginTop: "8px", display: "flex", gap: "5px"}}
                                    >
                                        <input
                                            type="text"
                                            className="custom-option-input"
                                            placeholder="Add custom option..."
                                            value={customOption}
                                            onChange={(e) => setCustomOption(e.target.value)}
                                            style={{width: "calc(100% - 40px)"}}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleOptionClick({
                                                        name: customOption.trim().replaceAll(" ", "_"),
                                                        label: customOption,
                                                        overrides: [],
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default AddableSelectField;
