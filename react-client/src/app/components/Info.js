import moment from 'moment';

const Info = ({ infoData }) =>{
  return (
      <div className="col-sm-3 col-sm-offset-1 cpu-info">
        <h3>Operating System</h3>
        <div className="widget-text">{infoData.osType}</div>
        <h3>Time Online</h3>
        <div className="widget-text">{moment.duration(infoData.systemUptime).humanize()}</div>
        <h3>Processor information</h3>
        <div className="widget-text"><strong>Model:</strong> {infoData.cpuModel}</div>
        <div className="widget-text"><strong>Number of Cores:</strong> {infoData.coreNumber}</div>
        <div className="widget-text"><strong>Clock Speed:</strong> {infoData.cpuSpeed}</div>
      </div>
  );
}

export default Info;