import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function ServiceHoursChart({ data }: any) {
  const hoursNeeded = 100;

  const calculateSum = (arr: any) => {
    return arr.reduce((total: number, current: any) => {
      return total + current?.hoursOfService;
    }, 0);
  }

  let pendingHours = data.filter((d: any) => d.status == "pendingApproval")
  pendingHours = calculateSum(pendingHours)

  let approvedHours = data.filter((d: any) => d.status == "approved")
  approvedHours = calculateSum(approvedHours)

  let hoursRemaining = ((pendingHours + approvedHours) - hoursNeeded)

  const options: Highcharts.Options = {
    chart: {
      plotBackgroundColor: '',
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
            '<span style="opacity: 0.6">{point.percentage:.1f} Hours</span>',
          connectorColor: 'rgba(128,128,128,0.5)'
        }
      }
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'Approved', y: approvedHours },
        { name: 'Pending', y: pendingHours },
      ]
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}