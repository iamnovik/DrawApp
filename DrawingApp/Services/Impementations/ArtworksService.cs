using DrawingApp.Models;
using DrawingApp.Models.Dto;
using DrawingApp.Services.Interfaces;

namespace DrawingApp.Services.Impementations;

public class ArtworksService : IArtworksService
{
    public async Task<SaveArtworkDto> SaveImage(IFormFile image)
    {
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }
    
        var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);
    
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return new SaveArtworkDto() { FileName = uniqueFileName, ImageFile = System.IO.File.ReadAllBytes(filePath) };
    }
}