export const getUniqueAirlineNames = (data) => {
    const airlineNames = new Set()

    data.best_flights.forEach(flightGroup => {
        flightGroup.flights.forEach(flight => {
          airlineNames.add(flight.airline);
        });
    });

    // data.other_flights.forEach(flightGroup => {
    //     flightGroup.flights.forEach(flight => {
    //       airlineNames.add(flight.airline);
    //     });
    // });

    return Array.from(airlineNames);
    
}

export const getMinMaxPrice = (data) => {
    let minPrice = Infinity;
    let maxPrice = -Infinity

    data.best_flights.forEach(flightGroup => {
        const price = flightGroup.price;
        if (price < minPrice) minPrice = price;
        if (price > maxPrice) maxPrice = price;
    })

    // data.other_flights.forEach(flightGroup => {
    //     const price = flightGroup.price;
    //     if (price < minPrice) minPrice = price;
    //     if (price > maxPrice) maxPrice = price;
    // });

    return { minPrice, maxPrice };
}

export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}g ${remainingMinutes}p`;
}

export const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

export const generatePNRCode = (str) =>  {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789'
    let pnr = ''
    for(let i = 0; i < 3; i++) {
        pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    for(let i = 0; i < 8; i++) {
        pnr += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return pnr;
}