import React from 'react';
import { ServiceOrderApi } from '../../api/ServiceOrderApi';
import TableUsers from 'app/components/TableUsers';
import useFetch from 'app/hooks/useFetch';
import ButtonCreateOrder from './ButtonCreateOrder';
import CardBox from 'components/CardBox';

const styleComponent = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

export default function ServiceOrderDetails({ history }) {
  const orders = useFetch(ServiceOrderApi.getList, 'service_orders');

  const state = {
    title: `Ordem de serviço do contrato`,
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'contract.number' },
    ],
    values: orders.data,
    tableActions: [
      {
        icon: 'edit',
        tooltip: 'Editar',
        onClick: (event, rowData) =>
          history.push({
            pathname: `/app/unidades/editar/${rowData.id}`,
            state: { unitId: rowData.id },
          }),
      },
      {
        icon: 'delete',
        tooltip: 'Remover',
        onClick: (event, rowData) => alert(rowData.id),
      },
    ],
  };

  if (!orders.length)
    return (
      <CardBox
        styleName="col-12"
        children={
          <div>
            <div className="row">
              <div className="col-md-12" style={styleComponent}>
                <h1>Nenhuma ordem de serviço cadastrada!</h1>
              </div>
              <ButtonCreateOrder history={history} />
            </div>
          </div>
        }
      />
    );

  return <TableUsers state={state} />;
}
