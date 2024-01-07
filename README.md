![Cover](./docs/cover.jpg)

## Introduction

Qrgo is a QR code generation API that creates customizable QR codes. It returns an image based on the provided query parameters, offering a simple and efficient way to generate QR codes for various needs.

## Endpoint

**GET /api/qr**

Generates a QR code based on the provided query parameters.

## Query Parameters

| Parameter  | Type       | Description                                                  |
|------------|------------|--------------------------------------------------------------|
| `as`       | svg \| png | Response format. Default is "svg".                           |
| `data`     | string     | The data to be encoded in the QR code. Required.             |
| `s`        | number     | Size of the QR code in pixels (100-1000). Default is 200.    |
| `bg`       | string     | Background color in hexadecimal. Default is `#000000`.       |
| `fg`       | string     | Foreground color in hexadecimal. Default is `#FFFFFF`.       |
| `cr`       | number     | Corner radius of the QR code (0-15). Default is 10.          |
| `title`    | string     | A title for the QR code. Default is empty.                   |
| `logo`     | string     | URL of a logo to include. Supports .jpg, .png. Default empty.|
| `download` | string     | Triggers a file download when set to `"true"`. Default empty.|

## Example Request

```
GET /api/qr?data=https://example.com&bg=%23000&fg=%23fff&title=Example&logo=https://placehold.co/120x120/FFF/000/png&cr=5
```

This request generates a QR code with the specified parameters:

- `data`: 'https://example.com'
- `bg`: Background color `#000`
- `fg`: Foreground color `#FFF`
- `title`: 'Example'
- `logo`: [https://placehold.co/120x120/FFF/000/png](https://placehold.co/120x120/FFF/000/png)
- `cr`: Corner radius is 5

![Example QR Code](https://qrgo.rakhi.mov/api/qr?data=https://example.com&s=100&bg=%23000&fg=%23fff&title=Example&logo=https://placehold.co/120x120/FFF/000/png&cr=5)

## Notes

- Ensure that URL parameters are properly encoded.
- The size, background, foreground colors, and corner radius can affect the visibility and scan-ability of the QR code. Test different configurations for the best results.
- Enjoy the service!

## Links

- [GitHub Repository](https://github.com/rakhimovkamran/qrgo)
- [Qrgo Home](https://qrgo.rakhi.mov)