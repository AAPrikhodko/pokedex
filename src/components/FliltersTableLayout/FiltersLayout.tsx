import React from 'react';
import {IFilter, IFiltersSettings} from "../../models/models";
import styles from "./FiltersLayout.module.scss"
import {Card, Col, Row, Select} from "antd";
import Search from "antd/es/input/Search";
import textData from "../../languages/en.json"
import {useDispatch} from "react-redux";
import {setName, setTypes} from "../../store/searchManager/filters.slice"
import {useAppSelector} from "../../hooks/redux";
import {useGetTypesConfigurationQuery} from "../../api/poke.api";

type renderFunc = (item: IFilter) => JSX.Element

interface IFiltersLayoutProps {
    filtersSettings: IFiltersSettings
    isDataLoaded: boolean
}

interface IElements {
    name: renderFunc,
    tag: renderFunc
}

const FiltersLayout = (props: IFiltersLayoutProps) => {

    const {filtersSettings, isDataLoaded} = props
    const {title, filters} = filtersSettings
    const types = useAppSelector((state) => state.searchManagerFilters.types)
    const {data: options} = useGetTypesConfigurationQuery()
    const filteredOptions = options?.filter((o: string) => !types?.includes(o));
    const searchHandler = (name: string) => dispatch(setName(name));
    const changeTypeHandler = (types: string[]) => dispatch(setTypes(types))
    const dispatch = useDispatch()

    const renderName = (filter: IFilter) => {
        const {placeholder = textData.searchManager.filters.defaultPlaceholder, span = 12} = filter
        return (
            <Col span={span}>
                <Search
                    disabled={!isDataLoaded}
                    placeholder={placeholder}
                    onSearch={searchHandler}
                    enterButton
                />
            </Col>
        )
    }

    const renderTag = (filter: IFilter) => {
        const {placeholder = textData.searchManager.filters.defaultPlaceholder, span = 12} = filter
        return (
            <Col span={span}>
                <Select
                    disabled={!isDataLoaded}
                    mode="multiple"
                    placeholder={placeholder}
                    value={types}
                    onChange={changeTypeHandler}
                    style={{width: '100%'}}
                    options={filteredOptions?.map((item: any) => ({
                        value: item.toUpperCase(),
                        label: item.toUpperCase(),
                    }))}
                />
            </Col>
        )
    }

    const elements: IElements = {
        name: renderName,
        tag: renderTag
    }

    return (
        <Card
            title={title}
            type="inner"
            bordered={false}
            className={styles.customCard}
        >
            <Row gutter={20} className={styles.filtersData}>
                {filters.map((item: IFilter) => (
                    (elements as any)[item.type](item)
                ))}
            </Row>
        </Card>
    );
};

export default FiltersLayout;