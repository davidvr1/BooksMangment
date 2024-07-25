// See https://aka.ms/new-console-template for more information
using Confluent.Kafka;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

var config = new ConsumerConfig { 
    BootstrapServers = "localhost:9092",
   GroupId="weather-consumer-group",
   AutoOffsetReset=AutoOffsetReset.Earliest,

};
using var consumer = new ConsumerBuilder<Null, string>(config).Build();

    consumer.Subscribe("test");
    CancellationTokenSource token = new();

try
{
    while (true)
    {
        var response = consumer.Consume(token.Token);
        if(response.Message != null)
        {
            var weather = JsonConvert.DeserializeObject<Weater>
                (response.Message.Value);
            Console.WriteLine($"City: {weather.State}, " +
                $"Temperture: {weather.Temprature}C");
        }
    }
}
catch (Exception)
{

	throw;
}
public record Weater(string State, int Temprature);