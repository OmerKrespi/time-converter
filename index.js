document.addEventListener('DOMContentLoaded', function() {
  // Define GMT mappings for each gateway
  const gatewayTimezones = {
    "CitiBank": 8,
    "DBS": 8,
    "Doku": 7,
    "Dragonpay": 8,
    "Rendimento": -3,
    "Safetypay": -5,
    "Tranglo": 8,
    "STP": -6,
    "Razor": 8,
  };

  // Update the input GMT based on the selected gateway
  document.getElementById('gateway').addEventListener('change', function() {
    const selectedGateway = this.value;

    if (selectedGateway) {
      // Disable manual input of the input GMT when a gateway is selected
      const inputTimezone = gatewayTimezones[selectedGateway];
      // No manual timezone selection needed here anymore
    }
  });

  // Convert Button Event Listener
  document.getElementById('convert-btn').addEventListener('click', function() {
    const gateway = document.getElementById('gateway').value;
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const outputTimezone = parseInt(document.getElementById('output-timezone').value);

    // If no datetime is selected
    if (!dateInput || !timeInput || !gateway) {
      alert("Please select a gateway, date, and time.");
      return;
    }

    // Combine date and time input into a single Date object
    let inputDate = new Date(`${dateInput}T${timeInput}:00`);

    // Get the timezone of the selected gateway (input timezone)
    const inputTimezone = gatewayTimezones[gateway];

    // Calculate the time difference between the input timezone and Israel time
    // Israel time zone is either +2 (Winter) or +3 (Summer)
    const timezoneDifference = inputTimezone - outputTimezone;  // (inputTimezone) - (IsraelTime)

    // Adjust the input time based on the timezone difference
    inputDate.setHours(inputDate.getHours() - timezoneDifference);

    // Format the final converted time to a human-readable format
    const convertedTime = inputDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    // Display the converted time
    document.getElementById('converted-time').textContent = convertedTime;
  });
});
