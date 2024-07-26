import { useState } from "react"


function WhetherApp() {

	const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
	const API_KEY = '18af74905c061cc9b04d6f81637fcd8b'
	const kelvin = 273.15

	const [ciudad, setCiudad] = useState('')
	const [dataClima, setDataClima] = useState(null)


	const handle = (j) => {
		setCiudad(j.target.value)
	}

	const handleSubmit = (j) => {
		j.preventDefault()
		if (ciudad.length > 0) { fetchClima() }
	}

	const fetchClima = async () => {
		try {
			const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
			const data = await response.json()
			setDataClima(data)
		} catch {
			console.error('ocurrio el errror')
		}
	}


	return (

		<div className='container'>

			<h1>aplicacion de Clima</h1>

			<form onSubmit={handleSubmit}>
				<input type="text"
					value={ciudad}
					onChange={handle} />
				<button>Buscar</button>
			</form>
			{
				dataClima && (
					<div>
						<h2> {dataClima.name} </h2>
						<p>Temperatura : {parseInt(dataClima?.main?.temp - kelvin)} oC</p>
						<p>Condicion : {String(dataClima.weather[0].main)}</p>
						<p>Descripcion del clima : {dataClima.weather[0].description} </p>
						<hr />
						<p>Longitud {ciudad} : {dataClima.coord.lon} </p>
						<p>Latitud  {ciudad} : {dataClima.coord.lat} </p>
						<hr />
						<img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
					</div>
				)
			}
		</div>
	)
}

export default WhetherApp
