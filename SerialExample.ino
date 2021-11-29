
void setup() {
  // initialize serial port:
  Serial.begin(9600);
}

void loop() {
  int f = random(0, 10);
  Serial.println(f);
  delay(1000);
}
