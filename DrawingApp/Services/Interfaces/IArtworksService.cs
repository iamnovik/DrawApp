using DrawingApp.Models;
using DrawingApp.Models.Dto;

namespace DrawingApp.Services.Interfaces;

public interface IArtworksService
{
    Task<SaveArtworkDto> SaveImage(IFormFile image);
}