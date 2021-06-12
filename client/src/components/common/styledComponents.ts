import styled from 'styled-components'

export const ButtonLabel = styled.label<{color: string}>`
    color: ${(props) => props.color};
    font-size: 17px;
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 5px;
    padding-right: 5px;
    cursor: pointer;
`

export const Button = styled.button<{bgColor: string, hoveredBgColor: string, borderColor: string, hoveredLabelColor: string}>`
    width: auto;
    height: 35px;
    background-color: ${(props) => props.bgColor};
    border-radius: 4px;
    cursor: pointer;
    border-color: ${(props) => props.borderColor};

    &:hover {
        background-color: ${(props) => props.hoveredBgColor};
        & label {
            color: ${(props) => props.hoveredLabelColor};
        }
    }
`

export const Table = styled.table<{}>`
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, Helvetica, sans-serif;
`

export const TableHead = styled.thead<{}>`
    text-align: left;
    border: 1px solid #ddd;
`

export const TableData = styled.td<{}>`
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
`;

export const Tr = styled.tr<{}>`
    &:nth-child(even){
        background-color: #f2f2f2;
    }
    &:hover {
        background-color: #ddd;
    }
`