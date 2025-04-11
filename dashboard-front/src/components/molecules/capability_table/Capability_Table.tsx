import { useEffect, useState } from "react";
import { Capabilities } from "../../../data/entities_types/types";
import { capabilityBaseApiURL } from "../../../data/endpoints/api_endpoints";
import "./Capability_Table.css";
import ToolButton from "../../atoms/toolbutton/ToolButton";

interface Capability_Table_Props {
  isRemoveActive: boolean;
}

const Capability_Table = ({ isRemoveActive }: Capability_Table_Props) => {
  const [capabilities, setCapabilities] = useState<Capabilities[]>([]);
  const [page, setPage] = useState(1);
  const maxElements = 10;

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const capabilitiesFetch = await fetch(capabilityBaseApiURL);
        const data = await capabilitiesFetch.json();
        setCapabilities(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCapabilities();
  }, []);

  const handleDelete = (id: number) => {
    fetch(`${capabilityBaseApiURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        alert("Profile successfully deleted: " + JSON.stringify(data))
      );
    location.reload();
  };

  const handlePageSelection = (cont: number) => {
    setPage(cont);
  };

  return (
    <>
      <table className="capability-table">
        <thead>
          <tr className="capability-table__row">
            <td className="capability-table__id">ID</td>
            <td className="capability-table__name">Name</td>
            <td className="capability-table__type">Type</td>
          </tr>
        </thead>
        <tbody>
          {capabilities
            .filter((capability, cont) => {
              if (cont < 10 * page && cont >= 10 * (page - 1))
                return capability;
            })
            .map((capability, cont) => (
              <tr className="capability-table__row" key={cont}>
                <td className="capability-table__id">{capability.id}</td>
                <td className="capability-table__name">{capability.name}</td>
                <td className="capability-table__type">{capability.type}</td>
                {isRemoveActive ? (
                  <td>
                    <ToolButton
                      icon={"fa-solid fa-trash"}
                      group={"dasd"}
                      handleClick={() => handleDelete(capability.id)}
                    />
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="capability-pagination">
        {capabilities
          .filter((capability, cont) => {
            if ((cont + 1) % maxElements == 1) return capability;
          })
          .map((_capability, cont) => (
            <a onClick={() => handlePageSelection(cont + 1)}>{cont + 1}</a>
          ))}
      </div>
    </>
  );
};

export default Capability_Table;
