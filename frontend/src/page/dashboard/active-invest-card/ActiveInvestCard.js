import React from 'react';
import './activeInvestCard.css'
import { Table } from 'antd';


const ActiveInvestCard = (data) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Total',
            dataIndex: 'total',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];

    // Verileri dönüştürmek için yardımcı fonksiyon
    const transformData = (inputData) => {
        const outputData = [];
        let key = 1;

        for (const symbol in inputData) {
            outputData.push({
                key: key.toString(),
                name: symbol,
                total: inputData[symbol].free,
                cost: inputData[symbol].total + " $",
            });
            key += 1;
        }

        return outputData;
    };



    const tableData = transformData(data.data)
    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div style={{paddingTop:'20px', marginLeft:"-7px"}}>
            <Table columns={columns} dataSource={tableData} onChange={onChange} pagination={{pageSize: 6}} title={() => <strong>Active Varliklar</strong>}  style={{boxShadow:' 0 4px 6px rgba(2, 56, 98, 0.9)',border:'1px solid #2C3E50',borderRadius:'10px' }}/>
        </div>
    );
};

export default ActiveInvestCard;