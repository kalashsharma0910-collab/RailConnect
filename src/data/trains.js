// Illustrative demo data only — not live or verified railway information.
export const trains = [
  { id: 'RC101', number: '12002', name: 'Shatabdi Express', from: 'New Delhi', to: 'Chandigarh', departure: '07:40', arrival: '11:05', duration: 205, fare: 780, classes: ['CC', 'EC'], days: 'Daily', type: 'Express' },
  { id: 'RC102', number: '22455', name: 'Vande Bharat Express', from: 'New Delhi', to: 'Chandigarh', departure: '15:20', arrival: '18:45', duration: 205, fare: 950, classes: ['CC', 'EC'], days: 'Except Sunday', type: 'Premium' },
  { id: 'RC103', number: '12005', name: 'Kalka Shatabdi (Demo)', from: 'New Delhi', to: 'Kalka', departure: '07:00', arrival: '11:55', duration: 295, fare: 890, classes: ['CC', 'EC'], days: 'Daily', type: 'Express' },
  { id: 'RC104', number: '14629', name: 'Sutlej Express (Demo)', from: 'Chandigarh', to: 'Amritsar', departure: '08:15', arrival: '13:20', duration: 305, fare: 420, classes: ['SL', '3A', '2A'], days: 'Daily', type: 'Express' },
  { id: 'RC105', number: '12013', name: 'Amritsar Shatabdi (Demo)', from: 'New Delhi', to: 'Amritsar', departure: '16:30', arrival: '22:10', duration: 340, fare: 1100, classes: ['CC', 'EC'], days: 'Daily', type: 'Premium' },
  { id: 'RC106', number: '12925', name: 'Paschim Express (Demo)', from: 'New Delhi', to: 'Mumbai Central', departure: '11:05', arrival: '09:15', duration: 1330, fare: 1450, classes: ['SL', '3A', '2A', '1A'], days: 'Daily', type: 'Express' },
  { id: 'RC107', number: '12046', name: 'Chandigarh Shatabdi (Demo)', from: 'Chandigarh', to: 'New Delhi', departure: '18:20', arrival: '21:45', duration: 205, fare: 780, classes: ['CC', 'EC'], days: 'Daily', type: 'Express' },
  { id: 'RC108', number: '22458', name: 'Vande Bharat (Demo)', from: 'Chandigarh', to: 'New Delhi', departure: '06:45', arrival: '10:10', duration: 205, fare: 950, classes: ['CC', 'EC'], days: 'Except Sunday', type: 'Premium' },
  { id: 'RC109', number: '12030', name: 'Amritsar Shatabdi (Demo)', from: 'Amritsar', to: 'New Delhi', departure: '05:00', arrival: '10:40', duration: 340, fare: 1100, classes: ['CC', 'EC'], days: 'Daily', type: 'Premium' },
  { id: 'RC110', number: '14554', name: 'Himachal Express (Demo)', from: 'Kalka', to: 'New Delhi', departure: '18:50', arrival: '23:35', duration: 285, fare: 390, classes: ['SL', '3A'], days: 'Daily', type: 'Express' },
  { id: 'RC111', number: '12952', name: 'Mumbai Rajdhani (Demo)', from: 'New Delhi', to: 'Mumbai Central', departure: '16:55', arrival: '08:35', duration: 940, fare: 2200, classes: ['3A', '2A', '1A'], days: 'Daily', type: 'Premium' },
  { id: 'RC112', number: '12445', name: 'Uttar Sampark Kranti (Demo)', from: 'New Delhi', to: 'Chandigarh', departure: '20:10', arrival: '23:55', duration: 225, fare: 520, classes: ['SL', '3A', '2A'], days: 'Daily', type: 'Express' }
];

export const stations = [...new Set(trains.flatMap(train => [train.from, train.to]))].sort();
